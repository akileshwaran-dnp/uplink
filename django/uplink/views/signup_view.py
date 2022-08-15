from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response


class SignUpView(APIView):

    def get(self, request):
        USERNAME = 'username'
        username = request.query_params[USERNAME]
        res = Response()
        if User.objects.filter(username=username).exists():
            res.data = "USERNAME_UNAVAILABLE"
        else:
            res.data = "USERNAME_AVAILABLE"
        return res

    def post(self, request):

        USERNAME = 'username'
        PASSWORD = 'password'
        FIRSTNAME = 'first_name'
        LASTNAME = 'last_name'
        EMAIL = 'email'
        DATE_JOINED = 'date_joined'

        res = Response()

        user_data = request.data

        if User.objects.filter(username=user_data[USERNAME]).exists():
            res.data = "DUPLICATE_UNAME"
            return res

        user = User.objects.create_user(
            username=user_data[USERNAME],
            password=user_data[PASSWORD],
            first_name=user_data[FIRSTNAME],
            last_name=user_data[LASTNAME],
            email=user_data[EMAIL],
            date_joined=user_data[DATE_JOINED]
        )
        res.data = "SIGNUP_SUCCESS"
        return res
