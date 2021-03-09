from rest_framework import serializers
from .models import *


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'password', 'age', 'title')


class CarCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ("id","my_business","license_number","license_validity", "insurance_validity", "insurance_up_to_age", "image" )


class WorkerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'age', 'title', 'license')


class MyBusinessCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyBusiness
        manager = UserCreateSerializer(many=False)
        deputy_director = UserCreateSerializer(many=False)
        logo = serializers.FileField(max_length=None, use_url=True, required=False)
        fields = ('manager','deputy_director', 'name', 'logo')


class CostumerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Costumer
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'address')


class ProjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        contractor_id = WorkerCreateSerializer(many=False)
        architect_id = WorkerCreateSerializer(many=False)
        owner_id = CostumerCreateSerializer(many=False)
        fields = ('id', 'type_of_building', 'address', 'contractor_id', 'architect_id', 'owner_id')


class ReportCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        worker_id = WorkerCreateSerializer(many=False)
        project_id = ProjectCreateSerializer(many=False)
        fields = ('id', 'worker_id', 'project_id', 'reporting_date', 'start_time', 'end_time', 'description')




