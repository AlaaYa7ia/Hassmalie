from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# here we create users and super users
class UserAccountManager(BaseUserManager):
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


# user account model, for managers and deputy directors
class UserAccount(AbstractBaseUser, PermissionsMixin):
    USER_TYPE = (
        ('M', 'Manager'),
        ('D', 'Deputy Director'),
        # ('R', 'Regular'),
    )
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.IntegerField(default=None)
    address = models.CharField(max_length=255)
    age = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    title = models.CharField(max_length=1, choices=USER_TYPE, default='M')
    photo = models.ImageField(upload_to='usersphotos/')
    objects = UserAccountManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number', 'address', 'title']

    def get_full_name(self):
        return self.first_name  # add last name here

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email


# my business model, represent the business information.
class MyBusiness(models.Model):
    manager = models.OneToOneField(UserAccount, related_name='M', on_delete=models.PROTECT)
    deputy_director = models.OneToOneField(UserAccount, related_name='D', on_delete=models.PROTECT)
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='logos/')
    # fanincial_id
    REQUIRED_FIELDS = ['manager', 'name']

    def __str__(self):
        return self.name


# the worker model, represent a worker with no high permissions. Regular, constrictor or architect.
# it's a regular model, not a user model.
class Worker(models.Model):
    WORKER_TYPE = (
        ('R', 'Regular'),
        ('C', 'Contractor'),
        ('A', 'Architect'),
    )
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    email = models.EmailField(max_length=255, unique=True, default=None)  # username
    app_password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255, default=None)
    last_name = models.CharField(max_length=255, default=None)
    photo = models.ImageField(upload_to='workers/photos/')
    phone_number = models.IntegerField(default=None)
    address = models.CharField(max_length=255, default=None)
    age = models.IntegerField(default=0)
    title = models.CharField(max_length=1, choices=WORKER_TYPE, default='R')
    id_photo = models.ImageField(upload_to='workers/ids/')
    rate_per_day = models.FloatField(null=True, default=None)
    license = models.ImageField(upload_to='workers/licenses/')
    permit = models.ImageField(upload_to='workers/permits/', default=None)
    permit_type = models.CharField(null=True, max_length=255, default=None)  # we should change it to options
    permit_validity = models.DateField(null=True, default=None)

    def __str__(self):
        return str(self.email)


# car model
class Car(models.Model):
    # many to one relation
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    license_number = models.IntegerField(default=None)
    license_validity = models.DateField(default=None)
    insurance_validity = models.DateField(default=None)
    insurance_up_to_age = models.IntegerField(default=None)
    image = models.ImageField(upload_to='carimages/', default=None)

    def __str__(self):
        return str(self.license_number)


# costumer model, it's a regular model, not a user model.
class Costumer(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.IntegerField(default=None)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.first_name


# constricting project model.
class Project(models.Model):
    type_of_building = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contractor_id = models.ForeignKey(Worker, related_name='contractor_id', on_delete=models.PROTECT)
    architect_id = models.ForeignKey(Worker, related_name='architect_id', on_delete=models.PROTECT)
    owner_id = models.ForeignKey(Costumer, on_delete=models.PROTECT)
    buildingImage = models.ImageField(upload_to='projects/buildingimages/',  default=None)

    def __str__(self):
        return str(self.type_of_building)


# a worker report model
class Report(models.Model):
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    worker_id = models.ForeignKey(Worker, on_delete=models.PROTECT)
    project_id = models.ForeignKey(Project, on_delete=models.PROTECT)
    reporting_date = models.DateField(default=None)
    start_time = models.TimeField()
    end_time = models.TimeField()
    # file storage id
    description = models.TextField()

    def __str__(self):
        return str(self.worker_id)


class ProjectFile(models.Model):
    project_id = models.ForeignKey(Project, on_delete=models.PROTECT)
    FILE_CATEGORY = (
            ('P', 'Plans'),
            ('B', 'Bids'),
            ('I', 'Images'),
            ('Pay', 'Payments'),
    )
    category = models.CharField(max_length=3, choices=FILE_CATEGORY, default='I')
    file = models.FileField(upload_to='projects/projectsfiles/')
    REQUIRED_FIELDS = ['project_id', 'file']
    def __str__(self):
        return str(self.file.name)