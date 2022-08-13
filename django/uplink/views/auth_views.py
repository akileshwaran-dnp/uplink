from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.datastructures import MultiValueDictKeyError

from ..serializer import UsersSerializer

from ..models import Users

from ..errors import *


class SigInViews(APIView):
    def get(self, request):
        res = Response()

        # Gaurd clauses
        if 'username' not in request.query_params or 'password' not in request.query_params:
            raise MultiValueDictKeyError()

        try:
            uname = request.query_params['username']
            pcode = request.query_params['password']
            query_data = Users.objects.values(
                'password').filter(username=uname)
            if query_data.first()['password'] == pcode:
                res.data = "VALID_CREDS"
            else:
                res.data = "INCORRECT_PASSWORD"
            return res
        except MultiValueDictKeyError:
            res.status_code = 400
            res.data = "MISMATCH_PARAMS"
            return res
        except TypeError:
            res.data = "INVALID_USERNAME"
            return res


class SignUpViews(APIView):
    def get(self, request):
        res = Response()
        uname = request.query_params['username']
        if Users.objects.filter(username=uname).exists():
            res.data = "UNAME_UNAVAILABLE"
        else:
            res.data = "UNAME_AVAILABLE"
        return res

    def post(self, request):
        res = Response()
        try:
            serializer = UsersSerializer(data=request.data)
            if not serializer.is_valid():
                raise DuplicateDataException("username already exists")
            serializer.save()
            res.data = "SIGNUP_SUCCESS"
            return res
        except DuplicateDataException as error:
            res.data = error.msg
            return res
