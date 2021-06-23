from django.test import TestCase
from hassmalieapp.models import *
import datetime

class BaseTest(TestCase):

    #user
    EMAIL= "email.test.com"
    PASSWORD = "pass7777"
    FIRST_NAME = "alaa"
    LAST_NAME = "yahia"
    PHONE_NUMBER = 852123456
    ADDRESS= "demoaddress"
    TITLE= 'M'

    #worker
    WEMAIL= "workeremail.test.com"
    WPASSWORD = "pass7777new"
    WFIRST_NAME = "worker"
    WLAST_NAME = "workerf"
    WPHONE_NUMBER = 8521763456
    WADDRESS= "demoaddress"
    WTITLE= 'R'

    #business
    BUSINESS_NAME= "new business"

    #car
    COMPANY= "audi"
    YEAR= 1995
    LICENCE = 896869
    VALAIDITY = datetime.date(2026,6,5)
    INSURANCE = datetime.date(2026,6,5)
    UP_TO_AGE = 56

    #customer
    CEMAIL= "customeremail.test.com"
    CPASSWORD = "pascustomernew"
    CFIRST_NAME = "customer"
    CLAST_NAME = "customerhg"
    CPHONE_NUMBER = 85273445356
    CADDRESS= "cdemoaddress"

    #project
    PROJECT_NAME='projectname'


    @classmethod
    def setUpTestData(self):
        manager = UserAccount.objects.create_user(email=self.EMAIL, password=self.PASSWORD, first_name= self.FIRST_NAME,
                                                  last_name=self.LAST_NAME,
                                        phone_number=self.PHONE_NUMBER, address=self.ADDRESS, title=self.TITLE)

        my_business = MyBusiness.objects.create(manager=manager,deputy_director=manager, name=self.BUSINESS_NAME)

        worker = Worker.objects.create(manager_id=manager.id,my_business_id= my_business.id, email=self.WEMAIL, password=self.WPASSWORD,
                              first_name= self.WFIRST_NAME, last_name=self.WLAST_NAME,
                                        phone_number=self.WPHONE_NUMBER, address=self.WADDRESS, title=self.WTITLE)

        car = Car.objects.create(my_business=my_business, driver_email= worker.email, company_name= self.COMPANY,
                                 manufacture_year =self.YEAR, license_number= self.LICENCE, license_validity= self.VALAIDITY,
                                 insurance_validity=self.INSURANCE, insurance_up_to_age=self.UP_TO_AGE)

        customer = Customer.objects.create(my_business=my_business,email=self.CEMAIL, password=self.CPASSWORD,
                                           first_name= self.CFIRST_NAME, last_name=self.CLAST_NAME,phone_number=self.CPHONE_NUMBER,
                                           address=self.CADDRESS)

        project = Project.objects.create(my_business=my_business, manager=manager, name=self.PROJECT_NAME,address=self.ADDRESS,
                                         contractor_id=worker, architect_id=worker, customer_id= customer)



class UserAccountModelTest(BaseTest):
    def test_UserAccount_not_None(self):
        model_instance = UserAccount.objects.get()
        self.assertIsNotNone(model_instance.id)

    def test_UserAccount_email(self):
        model_instance = UserAccount.objects.get()
        self.assertEquals(self.EMAIL, model_instance.email)

    def test_UserAccount_password(self):
        model_instance = UserAccount.objects.get()
        self.assertNotEquals(self.PASSWORD, model_instance.password)

    def test_UserAccount_first_name(self):
        model_instance = UserAccount.objects.get()
        self.assertEquals(self.FIRST_NAME, model_instance.first_name)

    def test_UserAccount_last_name(self):
        model_instance = UserAccount.objects.get()
        self.assertEquals(self.LAST_NAME, model_instance.last_name)

    def test_UserAccount_phone_number(self):
        model_instance = UserAccount.objects.get()
        self.assertEquals(self.PHONE_NUMBER, model_instance.phone_number)

    def test_UserAccount_address(self):
        model_instance = UserAccount.objects.get()
        self.assertEquals(self.ADDRESS, model_instance.address)

    def test_UserAccount_title(self):
        model_instance = UserAccount.objects.get()
        self.assertEquals(self.TITLE, model_instance.title)




class WorkerModelTest(BaseTest):
    def test_UserAccount_not_None(self):
        model_instance = Worker.objects.get()
        self.assertIsNotNone(model_instance.id)

    def test_UserAccount_email(self):
        model_instance = Worker.objects.get()
        self.assertEquals(self.WEMAIL, model_instance.email)

    def test_UserAccount_password(self):
        model_instance = Worker.objects.get()
        self.assertEquals(self.WPASSWORD, model_instance.password)

    def test_UserAccount_first_name(self):
        model_instance = Worker.objects.get()
        self.assertEquals(self.WFIRST_NAME, model_instance.first_name)

    def test_UserAccount_last_name(self):
        model_instance = Worker.objects.get()
        self.assertEquals(self.WLAST_NAME, model_instance.last_name)

    def test_UserAccount_phone_number(self):
        model_instance = Worker.objects.get()
        self.assertEquals(self.WPHONE_NUMBER, model_instance.phone_number)

    def test_UserAccount_address(self):
        model_instance = Worker.objects.get()
        self.assertEquals(self.WADDRESS, model_instance.address)

    def test_UserAccount_title(self):
        model_instance = Worker.objects.get()
        self.assertEquals(self.WTITLE, model_instance.title)



class CarModelTest(BaseTest):

    def test_Car_not_None(self):
        model_instance = Car.objects.get()
        self.assertIsNotNone(model_instance.id)

    def test_Car_my_business(self):
        model_instance = Car.objects.get()
        self.assertEquals(self.BUSINESS_NAME, model_instance.my_business.name)

    def test_Car_driver_email(self):
        model_instance = Car.objects.get()
        self.assertEquals(self.WEMAIL, model_instance.driver_email)

    def test_Car_company_name(self):
        model_instance = Car.objects.get()
        self.assertEquals(self.COMPANY, model_instance.company_name)

    def test_Car_manufacture_year(self):
        model_instance = Car.objects.get()
        self.assertEquals(self.YEAR, model_instance.manufacture_year)

    def test_Car_license_number(self):
        model_instance = Car.objects.get()
        self.assertEquals(self.LICENCE, model_instance.license_number)

    def test_Car_license_validity(self):
        model_instance = Car.objects.get()
        self.assertEquals(self.VALAIDITY, model_instance.license_validity)

    def test_Car_insurance_validity(self):
        model_instance = Car.objects.get()
        self.assertEquals(self.INSURANCE, model_instance.insurance_validity)

    def test_Car_insurance_up_to_age(self):
        model_instance = Car.objects.get()
        self.assertEquals(self.UP_TO_AGE, model_instance.insurance_up_to_age)


class CustomerModelTest(BaseTest):

    def test_Customer_not_None(self):
        model_instance = Customer.objects.get()
        self.assertIsNotNone(model_instance.id)

    def test_Customer_email(self):
        model_instance = Customer.objects.get()
        self.assertEquals(self.CEMAIL, model_instance.email)

    def test_UserAccount_password(self):
        model_instance = Customer.objects.get()
        self.assertEquals(self.CPASSWORD, model_instance.password)

    def test_UserAccount_first_name(self):
        model_instance = Customer.objects.get()
        self.assertEquals(self.CFIRST_NAME, model_instance.first_name)

    def test_UserAccount_last_name(self):
        model_instance = Customer.objects.get()
        self.assertEquals(self.CLAST_NAME, model_instance.last_name)

    def test_UserAccount_phone_number(self):
        model_instance = Customer.objects.get()
        self.assertEquals(self.CPHONE_NUMBER, model_instance.phone_number)

    def test_UserAccount_address(self):
        model_instance = Customer.objects.get()
        self.assertEquals(self.CADDRESS, model_instance.address)

class ProjectModelTest(BaseTest):

    def test_Project_not_None(self):
        model_instance = Project.objects.get()
        self.assertIsNotNone(model_instance.id)

    def test_Project_name(self):
        model_instance = Project.objects.get()
        self.assertEquals(self.PROJECT_NAME, model_instance.name)

    def test_Project_my_business(self):
        model_instance = Project.objects.get()
        self.assertEquals(self.BUSINESS_NAME, model_instance.my_business.name)

    def test_Project_manager(self):
        model_instance = Project.objects.get()
        self.assertEquals(self.FIRST_NAME, model_instance.manager.first_name)

    def test_Project_name(self):
        model_instance = Project.objects.get()
        self.assertEquals(self.PROJECT_NAME, model_instance.name)

    def test_Project_address(self):
        model_instance = Project.objects.get()
        self.assertEquals(self.ADDRESS, model_instance.address)

    def test_Project_contractor_id(self):
        model_instance = Project.objects.get()
        self.assertEquals(self.WFIRST_NAME, model_instance.contractor_id.first_name)

    def test_Project_architect_id(self):
        model_instance = Project.objects.get()
        self.assertEquals(self.WFIRST_NAME, model_instance.architect_id.first_name)

    def test_Project_customer_id(self):
        model_instance = Project.objects.get()
        self.assertEquals(self.CFIRST_NAME, model_instance.customer_id.first_name)


