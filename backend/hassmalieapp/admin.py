from django.contrib import admin
from .models import UserAccount


class HassmalieAdmin(admin.ModelAdmin):
    list_display = (
        'email', 'first_name', 'last_name', 'phone_number', 'address', 'age', 'is_active', 'is_staff', 'title')


# Register your models here.
admin.site.register(UserAccount, HassmalieAdmin)
