from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import UserCreateSerializer
from .models import UserAccount


class UserView(viewsets.ModelViewSet):
    serializer_class = UserCreateSerializer
    queryset = UserAccount.objects.all()
