from django.contrib.auth.models import User
from django.contrib.auth.models import UserManager
from rest_framework.views import APIView
from rest_framework.response import Response


class SignInView(APIView):
    def get(self, request):
        USERNAME = 'username'
        PASSWORD = 'password'
        LOGIN_DT = 'login_dt'

        username = request.query_params[USERNAME]
        password = request.query_params[PASSWORD]
        login_dt = request.query_params[LOGIN_DT]

        res = Response()
        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            res.data = "INCORRECT_PASSWORD"
            if User.check_password(user, password):
                user.last_login = login_dt
                user.save()

                res.data = "LOGIN_SUCCESS"
            return res

        res.data = "INVALID_USERNAME"
        return res
