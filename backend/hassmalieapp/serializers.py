from rest_framework import serializers
from .models import UserAccount

class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'password')