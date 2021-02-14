from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import UserCreateSerializer, CarCreateSerializer, MyBusinessCreateSerializer, WorkerCreateSerializer
from .models import *


class UserView(viewsets.ModelViewSet):
    serializer_class = UserCreateSerializer
    queryset = UserAccount.objects.all()


class CarView(viewsets.ModelViewSet):
    serializer_class = CarCreateSerializer
    queryset = Car.objects.all()


class MyBusinessView(viewsets.ModelViewSet):
    serializer_class = MyBusinessCreateSerializer
    queryset = MyBusiness.objects.all()


class WorkerView(viewsets.ModelViewSet):
    serializer_class = WorkerCreateSerializer
    queryset = Worker.objects.all()
