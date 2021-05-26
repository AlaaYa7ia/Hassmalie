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
    filterset_fields = ['my_business', 'manager', 'email','title', 'first_name', 'last_name', 'id']


class ReportView(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportCreateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['my_business', 'project_id', 'reporting_date', 'worker_id', 'reporting_date', 'start_time',
                        'end_time']


class CostumerView(viewsets.ModelViewSet):
    serializer_class = CostumerCreateSerializer
    queryset = Customer.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['email', 'first_name', 'last_name']


class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectCreateSerializer
    queryset = Project.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['address', 'contractor_id', 'customer_id']


class ProjectFileView(viewsets.ModelViewSet):
    serializer_class = ProjectFileCreateSerializer
    queryset = ProjectFile.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project_id', 'category']


class BidView(viewsets.ModelViewSet):
    serializer_class = BidCreateSerializer
    queryset = Bid.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project_id']


class SymbolView(viewsets.ModelViewSet):
    serializer_class = SymbolCreateSerializer
    queryset = Symbol.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['bid_id', 'price','type','count']


class LabelView(viewsets.ModelViewSet):
    serializer_class = LabelCreateSerializer
    queryset = Label.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['bid_id', 'annotation']


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskCreateSerializer
    queryset = Task.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['my_business', 'author_type', 'author_id', 'project_id', 'date', 'time']
