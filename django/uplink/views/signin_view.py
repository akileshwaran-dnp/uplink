from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes, api_view
from rest_framework.status import (HTTP_200_OK, HTTP_404_NOT_FOUND)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'username': username}, status=HTTP_200_OK)

    elif User.objects.filter(username=username).exists():
        return Response({'error': 'INCORRECT_PASSWORD'}, status=HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'INVALID_USERNAME'}, status=HTTP_404_NOT_FOUND)


@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response("success")
