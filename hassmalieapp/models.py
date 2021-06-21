from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone


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
    manager = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    email = models.EmailField(max_length=255, unique=True, default=None)  # username
    password = models.CharField(max_length=255)  # for the mobile app! we can't allow them to access our web
    # application!
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='workers/photos/')
    phone_number = models.IntegerField()
    address = models.CharField(max_length=255)
    age = models.IntegerField(default=0)
    title = models.CharField(max_length=1, choices=WORKER_TYPE, default='R')
    id_photo = models.ImageField(upload_to='workers/ids/')
    rate_per_day = models.FloatField(null=True, default=0)
    license = models.ImageField(upload_to='workers/licenses/',default=None)
    permit = models.ImageField( upload_to='workers/permits/', default=None)
    permit_type = models.CharField(null=True, max_length=255, default=None)  # we should change it to options
    permit_validity = models.DateField(null=True, default=None)
    is_active = models.BooleanField(default=True)
    REQUIRED_FIELDS = ['my_business', 'manager', 'email', 'first_name', 'last_name', 'phone_number', 'password',
                  'address', 'title']

    def __str__(self):
        return str(self.first_name) + " " + str(self.last_name)


# car model
class Car(models.Model):
    # many to one relation

    driver_email = models.TextField()
    company_name = models.TextField(null=True, default="")
    manufacture_year = models.IntegerField(null=True, default=None)
    license_number = models.IntegerField(default=None, unique=True)
    license_validity = models.DateField(default=None)
    insurance_validity = models.DateField(default=None)
    insurance_up_to_age = models.IntegerField(default=None)
    description = models.TextField()
    image = models.ImageField(upload_to='carimages/', default=None)
    is_working = models.BooleanField(default=True)
    REQUIRED_FIELDS = ["my_business", 'company_name', 'manufacture_year', "license_number", "license_validity", "insurance_validity", "insurance_up_to_age"]

    def __str__(self):
        return str(self.license_number)


# costumer model, it's a regular model, not a user model.
class Customer(models.Model):
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    age = models.IntegerField(default=0)
    phone_number = models.IntegerField()
    address = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='customers/photos/')
    REQUIRED_FIELDS = ['my_business', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'address']

    def __str__(self):
        return self.first_name


# constricting project model.
class Project(models.Model):
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    manager = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    type_of_building = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contractor_id = models.ForeignKey(Worker, related_name='contractor_id', on_delete=models.PROTECT)
    architect_id = models.ForeignKey(Worker, related_name='architect_id', on_delete=models.PROTECT)
    customer_id = models.ForeignKey(Customer, on_delete=models.PROTECT)
    buildingImage = models.ImageField(upload_to='projects/buildingimages/',  default=None)
    progress = models.IntegerField(default=0)
    is_closed = models.BooleanField(default=False)
    description = models.TextField(default="")
    REQUIRED_FIELDS = ['my_business', 'name', 'manager', 'address', 'contractor_id', 'architect_id', 'customer_id']

    def __str__(self):
        return str(self.name)


# a worker report model
class Report(models.Model):
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    worker_id = models.ForeignKey(Worker, on_delete=models.PROTECT)
    project_id = models.ForeignKey(Project, on_delete=models.PROTECT)
    reporting_date = models.DateField(default=None)
    start_time = models.TimeField()
    end_time = models.TimeField()
    description = models.TextField()
    photo = models.ImageField(upload_to='reports/')
    REQUIRED_FIELDS = ['my_business', 'worker_id', 'project_id', 'reporting_date', 'start_time', 'end_time']

    def __str__(self):
        return str(self.worker_id)


class ProjectFile(models.Model):
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    project_id = models.ForeignKey(Project, on_delete=models.PROTECT)
    FILE_CATEGORY = (
            ('P', 'Plans'),
            ('I', 'Images'),
            ('Pay', 'Payments'),
    )
    category = models.CharField(max_length=3, choices=FILE_CATEGORY, default='I')
    name = models.TextField(default="")
    file = models.FileField(upload_to='projects/projectsfiles/')
    deleted = models.BooleanField(default=False)
    description = models.TextField(default="")
    REQUIRED_FIELDS = ['my_business', 'project_id']

    def __str__(self):
        return str(self.file.name)


# Bid tabels
class Bid(models.Model):
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    project_id = models.ForeignKey(Project, on_delete=models.PROTECT)
    photo = models.FileField(upload_to='bids/')
    deleted = models.BooleanField(default=False)
    REQUIRED_FIELDS = ['my_business', 'photo', 'project_id']

    def __str__(self):
            return str(self.photo.name)


class Symbol(models.Model):
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    type = models.CharField(max_length=255)
    price = models.FloatField()
    photo = models.ImageField(upload_to='bids/symbols/')
    REQUIRED_FIELDS = ['my_business', 'type', 'price']

    def __str__(self):
        return str(self.type)


class BidTable(models.Model):
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    bid_id = models.ForeignKey(Bid, on_delete=models.PROTECT)
    version = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    count = models.IntegerField()
    price = models.FloatField()
    total_item_price = models.FloatField()

    REQUIRED_FIELDS = ['my_business', 'bid_id', 'type', 'count', 'price', 'total_item_price','version']

    def __str__(self):
        return str(self.type)


class Label(models.Model):
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    bid_id = models.ForeignKey(Bid, on_delete=models.PROTECT)
    version = models.CharField(max_length=255)
    x = models.FloatField()
    y = models.FloatField()
    w = models.FloatField()
    h = models.FloatField()
    annotation = models.CharField(max_length=255)
    REQUIRED_FIELDS = ['my_business', 'bid_id', 'x', 'y', 'w', 'h', 'annotation']

    def __str__(self):
        return str(self.annotation)


class Task(models.Model):
    AUTHOR_TYPE = (
        ('U', 'user'),
        ('W', 'worker'),
        ('C', 'customer'),
    )
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    author_type = models.CharField(max_length=1, choices=AUTHOR_TYPE, default='W')
    author_id = models.IntegerField()
    project_id = models.ForeignKey(Project, on_delete=models.PROTECT)
    date = models.DateField(default=None)
    time = models.TimeField()
    description = models.TextField()
    is_closed = models.BooleanField(default=False)
    photo = models.FileField(upload_to='tasks/')
    REQUIRED_FIELDS = ['my_business', 'author_type', 'author_id', 'project_id', 'date', 'time', 'description']

    def __str__(self):
        return str(self.author_id) + " " + str(self.project_id)


class Payment(models.Model):
    my_business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE)
    bid_id = models.ForeignKey(Bid, on_delete=models.PROTECT)
    version = models.CharField(default=None, max_length=255)
    total = models.FloatField()
    payment_date = models.DateField(default=None)
    pay_type = models.CharField(max_length=255)
    contact_mail = models.CharField(max_length=255)
    payer_name = models.CharField(max_length=255)
    pay_condition = models.CharField(max_length=255)
    REQUIRED_FIELDS = ['my_business', 'bid_id', 'total', 'payment_date', 'pay_type', 'pay_condition', 'payer_name','version']

    def __str__(self):
        return str(self.bid_id)

