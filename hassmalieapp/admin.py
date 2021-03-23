from django.contrib import admin
from .models import UserAccount


# TODO: PRUD VS LOCAL

# Custom Django admin
class HassmalieAdmin(admin.ModelAdmin):
    list_display = (
        'email', 'first_name', 'last_name', 'phone_number',
        'address', 'age', 'is_active', 'is_staff', 'title')


# Register models here.
admin.site.register(UserAccount, HassmalieAdmin)
