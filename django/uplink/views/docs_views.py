from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import viewsets
from django.http import HttpResponse
from django.core.files import File
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.conf import settings
import os
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.decorators import action

from ..serializer import FilesSerializer
from ..models import Docs
from rest_framework import permissions


class DocsViewsSets (viewsets.ViewSet):

    queryset = Docs.objects.all()
    serializer_class = FilesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        user = request.user
        username_id = user.id
        user_files_data = Docs.objects.filter(
            username_id=username_id).values('uploadDT', 'filename', 'filetype', 'fileUploadID').order_by('-uploadDT')
        user_history = []
        for user_file in user_files_data:
            user_file['uploadDT'] = user_file['uploadDT'].strftime(
                "%H:%M:%S %m-%d-%Y")
            user_history.append(user_file)
        return Response({'docs_history': user_history}, status=HTTP_200_OK)

    def retrieve(self, request, pk=None):
        try:
            fileData = Docs.objects.values(
                'fileurl', 'filename', 'filetype').filter(fileUploadID=pk)
            fileurl = fileData[0]['fileurl']
            filename = fileData[0]['filename'] + "." + fileData[0]['filetype']

            f = open(fileurl, 'rb')
            docFile = File(f)
            response = HttpResponse(docFile.read())
            response['Content-Disposition'] = f'filename= {filename}'
            return response
        except:
            return Response({'error': "file not found"}, HTTP_404_NOT_FOUND)

    def create(self, request):
        data = request.FILES['uploadedFiles']
        user = request.user
        username = user.username
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
                return Response({'uploadDT': upload_dt}, HTTP_200_OK)
            else:
                return Response({'error': 'required data not found'}, HTTP_400_BAD_REQUEST)
        except:
            res.data = "UPLOAD_FAILURE"
            return res
