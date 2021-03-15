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
    photo = serializers.ImageField(max_length=None, use_url=True, required=False)
    id_photo = serializers.ImageField(max_length=None, use_url=True, required=False)
    license = serializers.ImageField(max_length=None, use_url=True, required=False)
    permit = serializers.ImageField(max_length=None, use_url=True, required=False)
    permit_type = serializers.CharField(allow_blank=True, required=False)
    permit_validity = serializers.DateField(read_only=True, allow_null=True, required=False)
    rate_per_day = serializers.FloatField(read_only=True, required=False)

    class Meta:
        model = Worker
        fields = ('id','my_business', 'email', 'first_name', 'last_name','photo', 'phone_number', 'app_password',
                  'address', 'age', 'title','id_photo','rate_per_day', 'license', 'permit', 'permit_type', 'permit_validity')


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
    class Meta:
        model = Project
        fields = ('id', 'type_of_building', 'address', 'contractor_id', 'architect_id', 'owner_id')


class ReportCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('id','my_business', 'worker_id', 'project_id', 'reporting_date', 'start_time', 'end_time', 'description')




