from dataclasses import field, fields
from rest_framework.serializers import ModelSerializer
from . models import *


class FilesSerializer (ModelSerializer):
    class Meta:
        model = Docs
        fields = ['username_id', 'filename', 'fileurl',
                  'filetype', 'uploadDT', 'fileUploadID']
