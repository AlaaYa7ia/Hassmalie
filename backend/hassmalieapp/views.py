from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import *
from .models import *


class UserView(viewsets.ModelViewSet):
    serializer_class = UserCreateSerializer
    queryset = UserAccount.objects.all()


class CarView(viewsets.ModelViewSet):
    serializer_class = CarCreateSerializer

    def get_queryset(self):
        user = self.request.user
        cars = Car.objects.filter(my_business=self.kwargs['business'])
        return cars


class MyBusinessView(viewsets.ModelViewSet):
    serializer_class = MyBusinessCreateSerializer
    queryset = MyBusiness.objects.all()


class WorkerView(viewsets.ModelViewSet):
    serializer_class = WorkerCreateSerializer

    def get_queryset(self):
        user = self.request.user
        workers = Worker.objects.filter(my_business=self.kwargs['business'])
        return workers


class ReportView(viewsets.ModelViewSet):
    serializer_class = ReportCreateSerializer
    queryset = Report.objects.all()


class CostumerView(viewsets.ModelViewSet):
    serializer_class = CostumerCreateSerializer
    queryset = Costumer.objects.all()


class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectCreateSerializer
    queryset = Project.objects.all()
