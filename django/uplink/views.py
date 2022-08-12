from distutils.command.upload import upload
from rest_framework.views import APIView
from rest_framework import viewsets
from . serializer import *
from . models import *
from rest_framework.response import Response
from django.http import HttpResponse

import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from rest_framework.decorators import action
from django.db.models import Count
from django.core.files import File


class SigInViews(APIView):
    def get(self, request):
        uname = request.query_params['username']
        pcode = request.query_params['password']
        validity = "invalid username"
        for user in Users.objects.all():
            if user.username == uname:
                if user.password == pcode:
                    validity = "valid"
                else:
                    validity == "incorrect password"
                break

        res = {"username": uname, "validity": validity}
        return Response(res)


class SignUpViews(APIView):

    def get(self, request):
        uname = request.data['username']
        validity = ""
        if Users.objects.filter(username=uname).exists():
            validity = "exists"
        res = {"validity": validity}
        return Response(res)

    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            uname = serializer.validated_data['username']
            if not Users.objects.filter(username=uname).exists():
                serializer.save()
                return Response(serializer.data)
            return Response({"validity": "exists"})


class DocsViews (viewsets.ViewSet):
    @action(methods='get', detail=True)
    def get_history(self, request):
        username = request.query_params['username']
        user_files_data = Docs.objects.filter(
            username=username).values('uploadDT', 'filename', 'filetype', 'fileUploadID')
        user_history = []
        for user_file in user_files_data:
            user_file['uploadDT'] = user_file['uploadDT'].strftime(
                "%H:%M:%S %m-%d-%Y")
            user_history.append(user_file)
        return Response(user_history)

    def get_file(self, request):
        fileUpID = request.query_params['fileUploadID']
        fileData = Docs.objects.values(
            'fileurl', 'filename', 'filetype').filter(fileUploadID=fileUpID)
        fileurl = fileData[0]['fileurl']
        filename = fileData[0]['filename'] + "." + fileData[0]['filetype']
        f = open(fileurl, 'rb')
        docFile = File(f)
        response = HttpResponse(docFile.read())
        response['Content-Disposition'] = f'filename= {filename}'
        return response

    @action(methods='post', detail=True)
    def post_file(self, request):
        data = request.FILES['uploadedFiles']

        username = request.data['username']
        upload_dt = request.data['uploadDT']
        file_type = data.name.split('.')[-1]
        filename = data.name
        exact_filename = ".".join(filename.split('.')[:-1])
        fileurl = 'storage/' + username + "/" + upload_dt + "_" + filename

        file_data = {
            "username": username,
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
            return Response(serializer.data)
        return Response("failure")


class StatisticsView (viewsets.ViewSet):
    @action(detail=True, methods=['get'])
    def get_total_stats(self, request):
        res = {"total": Docs.objects.count()}
        return Response(res)

    def get_type_stats(self, request):
        res = Docs.objects.values('filetype').annotate(
            count=Count('filetype')).order_by('filetype')
        return Response(res)

    def get_user_stats(self, request):
        res = Docs.objects.values('username').annotate(
            count=Count('filename')).order_by('username')
        return Response(res)
