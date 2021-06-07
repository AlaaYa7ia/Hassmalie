"""
Serializers allow complex data such as querysets and model instances to be converted to native Python datatypes
that can then be easily rendered into JSON , XML or other content types.
"""
from rest_framework import serializers
from .models import *


class UserCreateSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(max_length=None, use_url=True, required=False)

    class Meta:
        model = UserAccount
        fields = (
            'id', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'password', 'age', 'title', 'photo')


class CarCreateSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, required=False)

    class Meta:
        model = Car
        fields = (
            "id", "my_business",'company_name', 'manufacture_year', "license_number", "license_validity", "insurance_validity", "insurance_up_to_age",
            "description", "image", 'is_working')


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
        fields = ('id', 'my_business', 'manager', 'email', 'first_name', 'last_name', 'photo', 'phone_number',
                  'password', 'address', 'age', 'title', 'id_photo', 'rate_per_day', 'license', 'permit', 'permit_type',
                  'permit_validity', 'is_active')


class MyBusinessCreateSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(max_length=None, use_url=True, required=False)

    class Meta:
        model = MyBusiness
        fields = ('manager', 'deputy_director', 'name', 'logo')


class CustomerCreateSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(max_length=None, use_url=True, required=False)

    class Meta:
        model = Customer
        fields = ('id', 'my_business', 'email', 'password', 'first_name', 'last_name', 'age',
                  'phone_number', 'address', 'photo')


class ProjectCreateSerializer(serializers.ModelSerializer):
    buildingImage = serializers.ImageField(max_length=None, use_url=True, required=False)

    class Meta:
        model = Project
        fields = ('id', 'my_business', 'manager', 'name','type_of_building', 'address', 'contractor_id', 'architect_id',
                  'customer_id', 'buildingImage', 'progress', 'is_closed', 'description')


class ReportCreateSerializer(serializers.ModelSerializer):
    photo = serializers.FileField(max_length=None, use_url=True, required=False)

    class Meta:
        model = Report
        fields = (
            'id', 'my_business', 'worker_id', 'project_id', 'reporting_date', 'start_time', 'end_time', 'description',
            'photo')


class ProjectFileCreateSerializer(serializers.ModelSerializer):
    file = serializers.FileField(max_length=None, use_url=True, required=True)

    class Meta:
        model = ProjectFile
        fields = ('id', 'my_business', 'project_id', 'category', 'file', 'description')


class BidCreateSerializer(serializers.ModelSerializer):
    photo = serializers.FileField(max_length=None, use_url=True, required=True)

    class Meta:
        model = Bid
        fields = ('id', 'my_business', 'project_id', 'photo')


class SymbolCreateSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(max_length=None, use_url=True, required=False)

    class Meta:
        model = Symbol
        fields = ('id','my_business', 'bid_id','type','count','price','total_item_price', 'photo')


class LabelCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Label
        fields = ('id', 'my_business', 'bid_id', 'x', 'y', 'w', 'h', 'annotation')


class TaskCreateSerializer(serializers.ModelSerializer):
    photo = serializers.FileField(max_length=None, use_url=True, required=False)

    class Meta:
        model = Task
        fields = ('id', 'my_business', 'author_type', 'author_id', 'project_id', 'date', 'time','description', 'photo')


class PaymentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = ('my_business', 'bid_id', 'total', 'payment_date', 'pay_type', 'pay_condition','contact_mail', 'payer_name')

