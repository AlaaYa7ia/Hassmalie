from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, generics
from django_filters import rest_framework as filters
from .serializers import *
from .models import *
from django_filters.rest_framework import DjangoFilterBackend


class UserView(viewsets.ModelViewSet):
    serializer_class = UserCreateSerializer
    queryset = UserAccount.objects.all()


class CarView(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarCreateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['my_business']


class MyBusinessView(viewsets.ModelViewSet):
    serializer_class = MyBusinessCreateSerializer
    queryset = MyBusiness.objects.all()


class WorkerView(viewsets.ModelViewSet):
    # serializer_class = WorkerCreateSerializer
    #
    # def get_queryset(self):
    #     user = self.request.user
    #     workers = Worker.objects.filter(my_business=self.kwargs['business'])
    #     return workers
    queryset = Worker.objects.all()
    serializer_class = WorkerCreateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['my_business', 'first_name', 'last_name']


class ReportView(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportCreateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['my_business', 'project_id', 'reporting_date', 'worker_id']




class CostumerView(viewsets.ModelViewSet):
    serializer_class = CostumerCreateSerializer
    queryset = Costumer.objects.all()


class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectCreateSerializer
    queryset = Project.objects.all()
