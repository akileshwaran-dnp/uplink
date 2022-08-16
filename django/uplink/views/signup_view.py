from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.status import (
    HTTP_409_CONFLICT, HTTP_200_OK, HTTP_400_BAD_REQUEST)


@permission_classes((AllowAny,))
class SignUpView(APIView):

    def get(self, request):
        username = request.data.get('username') or ''
        if User.objects.filter(username=username).exists():
            return Response({'available': 'Username is available'}, status=HTTP_200_OK)
        return Response({'unavailable': 'Username is taken'}, status=HTTP_409_CONFLICT)

    def post(self, request):

        if not 'username' in request.data and 'password' in request.data:
            return Response({'bad request': 'Please provide username and password'}, status=HTTP_400_BAD_REQUEST)

        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email') or ''
        firstname = request.data.get('first_name') or ''
        lastname = request.data.get('last_name') or ''

        if User.objects.filter(username=username).exists():
            return Response({'conflict': 'Username already exists'}, status=HTTP_409_CONFLICT)

        User.objects.create_user(
            username=username,
            password=password,
            first_name=firstname,
            last_name=lastname,
            email=email,
        )

        return Response({'success': 'Signup successful'}, status=HTTP_200_OK)
