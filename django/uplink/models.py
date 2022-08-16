from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Docs(models.Model):
    username_id = models.ForeignKey(User, on_delete=models.CASCADE)
    filename = models.CharField(max_length=32)
    fileurl = models.CharField(max_length=128)
    filetype = models.CharField(max_length=16)
    uploadDT = models.DateTimeField()
    fileUploadID = models.AutoField(primary_key=True)
