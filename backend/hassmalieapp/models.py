from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# Create your models here.

class UserAccountManager(BaseUserManager):
    # here we can also create super users and other kind of users
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)

        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user



class UserAccount(AbstractBaseUser, PermissionsMixin):
    USER_TYPE = (
        ('M', 'Manager'),
        ('D', 'Deputy Director'),
        ('R', 'Regular'),
    )
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.IntegerField(default=None)
    address = models.CharField(max_length=255)
    age = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    title = models.CharField(max_length=1, choices=USER_TYPE, default='M')
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number', 'address']

    def get_full_name(self):
        return self.first_name  # add last name here

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email


class MyBusiness(models.Model):
    manager = models.OneToOneField(UserAccount, on_delete=models.CASCADE)  # maybe we should change on_delete
    deputy_director = UserAccount  # ?
    name = models.CharField(max_length=255)
    logo = models.ImageField()

    def __str__(self):
        return self.name


class Car(models.Model):
    # many to one relation
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    license_number = models.IntegerField(default=None)
    license_validity = models.DateField(default=None)
    insurance_validity = models.DateField(default=None)
    insurance_up_to_age = models.IntegerField(default=None)
    image = models.ImageField()

    def __str__(self):
        return self.license_number

