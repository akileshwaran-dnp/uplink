from django.db import models


class Users(models.Model):
    username = models.CharField(max_length=32, primary_key=True)
    password = models.CharField(max_length=32)


class Docs(models.Model):
    username = models.ForeignKey(Users, on_delete=models.CASCADE)
    filename = models.CharField(max_length=32)
    fileurl = models.CharField(max_length=128)
    filetype = models.CharField(max_length=16)
    uploadDT = models.DateTimeField()
    fileUploadID = models.AutoField(primary_key=True)
