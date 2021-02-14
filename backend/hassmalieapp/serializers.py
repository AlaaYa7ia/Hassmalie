from rest_framework import serializers
from .models import UserAccount,Car, MyBusiness, Worker


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'password', 'age', 'title')


class CarCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ("id","my_business","license_number","license_validity", "insurance_validity", "insurance_up_to_age", "image" )


class MyBusinessCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyBusiness
        manager = UserCreateSerializer(many=False)
        cars = CarCreateSerializer(many=True)
        #deputy_director = WorkerCreateSerializer(many=False) # change it when you make the user model.
        fields = ('id', 'manager', 'name', 'logo') # add , 'deputy_director'

class WorkerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ('user', 'license', 'report_id')

