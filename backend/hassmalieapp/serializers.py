from rest_framework import serializers
from .models import *


class UserCreateSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(max_length=None, use_url=True, required=False)
    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'password', 'age', 'title', 'photo')


class CarCreateSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, required=False)
    class Meta:
        model = Car
        fields = ("id","my_business","license_number","license_validity", "insurance_validity", "insurance_up_to_age", "image" )



class WorkerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'age', 'title', 'license')


class MyBusinessCreateSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(max_length=None, use_url=True, required=False)
    class Meta:
        model = MyBusiness
        fields = ('manager','deputy_director', 'name', 'logo')


class CostumerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Costumer
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'address')


class ProjectCreateSerializer(serializers.ModelSerializer):
    contractor_id = WorkerCreateSerializer(many=False)
    architect_id = WorkerCreateSerializer(many=False)
    owner_id = CostumerCreateSerializer(many=False)
    class Meta:
        model = Project
        fields = ('id', 'type_of_building', 'address', 'contractor_id', 'architect_id', 'owner_id')


class ReportCreateSerializer(serializers.ModelSerializer):
    worker_id = WorkerCreateSerializer(many=False)
    project_id = ProjectCreateSerializer(many=False)
    class Meta:
        model = Report
        fields = ('id', 'worker_id', 'project_id', 'reporting_date', 'start_time', 'end_time', 'description')




