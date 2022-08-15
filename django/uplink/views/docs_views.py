from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import viewsets
from django.http import HttpResponse
from django.core.files import File
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.conf import settings
import os


from ..serializer import FilesSerializer
from ..models import Docs


class DocsViews (viewsets.ViewSet):
    def docs_history(self, request):
        res = Response()
        username = request.query_params['username']
        user = User.objects.get(username=username)
        username_id = user.id
        user_files_data = Docs.objects.filter(
            username_id=username_id).values('uploadDT', 'filename', 'filetype', 'fileUploadID').order_by('-uploadDT')
        user_history = []
        for user_file in user_files_data:
            user_file['uploadDT'] = user_file['uploadDT'].strftime(
                "%H:%M:%S %m-%d-%Y")
            user_history.append(user_file)
        res.data = user_history
        return res

    def download_doc(self, request):
        fileUpID = request.query_params['fileUploadID']

        try:
            fileData = Docs.objects.values(
                'fileurl', 'filename', 'filetype').filter(fileUploadID=fileUpID)
            fileurl = fileData[0]['fileurl']
            filename = fileData[0]['filename'] + "." + fileData[0]['filetype']

            f = open(fileurl, 'rb')
            docFile = File(f)
            response = HttpResponse(docFile.read())
            response['Content-Disposition'] = f'filename= {filename}'
            return response
        except:
            res = Response()
            res.status_code = 400
            res.data = "FILE_INACCESSIBLE"
            return res

    def create_doc(self, request):
        data = request.FILES['uploadedFiles']
        username = request.data['username']
        user = User.objects.get(username=username)
        username_id = user.id
        upload_dt = request.data['uploadDT']
        res = Response()

        try:
            file_type = data.name.split('.')[-1]
            filename = data.name
            exact_filename = ".".join(filename.split('.')[:-1])
            fileurl = 'storage/' + username + "/" + upload_dt + "_" + filename

            file_data = {
                "username_id": username_id,
                "filename": exact_filename,
                "fileurl": fileurl,
                "filetype": file_type,
                "uploadDT": upload_dt
            }
            serializer = FilesSerializer(data=file_data)
            if serializer.is_valid():
                serializer.save()
                path_to_save = default_storage.save(
                    fileurl, ContentFile(data.read()))
                os.path.join(settings.MEDIA_ROOT, path_to_save)
                res.data = upload_dt
                return res
            else:
                res.data = "UPLOAD_FAILURE"
                return res
        except:
            res.data = "UPLOAD_FAILURE"
            return res
