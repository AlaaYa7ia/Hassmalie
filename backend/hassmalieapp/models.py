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
    is_active = models.BooleanField(default=True)## ??
    is_staff = models.BooleanField(default=False) ##??
    title = models.CharField(max_length=1, choices=USER_TYPE, default='M')

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number', 'address', 'title']

    def get_full_name(self):
        return self.first_name  # add last name here

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email


class Worker(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, primary_key=True, default=None)
    license = models.DateField(default=None)
    REQUIRED_FIELDS = ['user','license']

    def __str__(self):
        return str(self.user)


class MyBusiness(models.Model):
    manager = models.OneToOneField(UserAccount, related_name='M', on_delete=models.PROTECT)
    deputy_director = models.OneToOneField(Worker, on_delete=models.PROTECT, default=1)
    name = models.CharField(max_length=255)
    logo = models.ImageField()
    #fanincial_id
    REQUIRED_FIELDS = ['manager','deputy_director', 'name']

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
        return str(self.license_number)


class Costumer(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.IntegerField(default=None)
    address = models.CharField(max_length=255)
    def __str__(self):
            return self.first_name


class Project(models.Model):
    type_of_building = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contractor_id = models.OneToOneField(Worker,related_name='contractor_id', on_delete=models.PROTECT)
    architect_id = models.OneToOneField(Worker,related_name='architect_id', on_delete=models.PROTECT)
    owner_id = models.OneToOneField(Costumer, on_delete=models.PROTECT)
    #file_storage_id =
    #bid_id =
    def __str__(self):
            return str(self.contractor_id)


class Report(models.Model):
        worker_id = models.OneToOneField(Worker, on_delete=models.PROTECT)
        project_id = models.OneToOneField(Project, on_delete=models.PROTECT)
        reporting_date = models.DateField(default=None)
        start_time = models.TimeField()
        end_time =  models.TimeField()
        #file storage id
        description = models.TextField()
        def __str__(self):
            return str(self.worker_id)


