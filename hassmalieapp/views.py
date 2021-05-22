"""
Views are callable which takes a request and returns a response.
Here's our application views.
"""
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
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['email', 'first_name', 'last_name', 'title']


class CarView(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarCreateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['my_business', 'license_number']


class MyBusinessView(viewsets.ModelViewSet):
    serializer_class = MyBusinessCreateSerializer
    queryset = MyBusiness.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['manager', 'name']


class WorkerView(viewsets.ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerCreateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['my_business','email','title', 'first_name', 'last_name', 'id']


class ReportView(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportCreateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['my_business', 'project_id', 'reporting_date', 'worker_id', 'reporting_date', 'start_time',
                        'end_time']


class CostumerView(viewsets.ModelViewSet):
    serializer_class = CostumerCreateSerializer
    queryset = Costumer.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['email', 'first_name', 'last_name']


class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectCreateSerializer
    queryset = Project.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['address', 'contractor_id', 'owner_id']
