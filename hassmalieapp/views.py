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
    filterset_fields = ['id', 'email', 'first_name', 'last_name', 'address', 'title']


class CarView(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarCreateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'my_business', 'license_number', 'manufacture_year', 'company_name', 'is_working']


class MyBusinessView(viewsets.ModelViewSet):
    serializer_class = MyBusinessCreateSerializer
    queryset = MyBusiness.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'manager', 'deputy_director', 'name']


class WorkerView(viewsets.ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerCreateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['my_business', 'manager', 'email', 'title', 'first_name', 'last_name', 'id', 'is_active']


class ReportView(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportCreateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'my_business', 'project_id', 'reporting_date', 'worker_id', 'reporting_date', 'start_time',
                        'end_time']


class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerCreateSerializer
    queryset = Customer.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'my_business','email', 'first_name', 'last_name', 'address']


class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectCreateSerializer
    queryset = Project.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'my_business', 'manager', 'name','type_of_building','address', 'contractor_id', 'architect_id',
                        'customer_id', 'is_closed']


class ProjectFileView(viewsets.ModelViewSet):
    serializer_class = ProjectFileCreateSerializer
    queryset = ProjectFile.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'my_business','project_id', 'category', 'deleted']


class BidView(viewsets.ModelViewSet):
    serializer_class = BidCreateSerializer
    queryset = Bid.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'my_business','project_id', 'deleted']


class SymbolView(viewsets.ModelViewSet):
    serializer_class = SymbolCreateSerializer
    queryset = Symbol.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'my_business', 'price','type']


class BidTableView(viewsets.ModelViewSet):
    serializer_class = BidTableCreateSerializer
    queryset = BidTable.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'my_business', 'bid_id', 'price','type','count']


class LabelView(viewsets.ModelViewSet):
    serializer_class = LabelCreateSerializer
    queryset = Label.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'my_business', 'bid_id', 'annotation','version']


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskCreateSerializer
    queryset = Task.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'my_business', 'author_type', 'author_id', 'project_id', 'date', 'time', 'is_closed']


class PaymentView(viewsets.ModelViewSet):
    serializer_class = PaymentCreateSerializer
    queryset = Payment.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [ 'my_business', 'bid_id','payment_date', 'payer_name']
