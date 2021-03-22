# Hassmalie

# # How to run the application (windows): 

1- clone the repository.

2- cd to "reacthassmalie" folder

3- run: npm run install, this will create a new package called node_modules in the reacthassmalie folder.

4- open new terminal

5-  cd to backend folder

6- activate your python virtual environment,  [see Python's documentation](https://docs.python.org/3/library/venv.html)

7- run: pip install -r requirements.txt

8- in the backend terminal run: python manage.py makemigrations

9- then run: python manage.py migrate

Note: you need to run steps 8 and 9 only once in order to configure your database. [for more information about Django migrations see documentation](https://docs.djangoproject.com/en/3.1/topics/migrations/) 

10- then run: python manage.py runserver

now you have your backend server running at http://localhost:8000/

11- in the frontend terminal (reacthassmalie) run: npm run start

now you have your frontend running at http://localhost:3000/


# # tests: 

- cd to backend folder. 
- to run spisific test or collection of tests run the command : python manage.py test *spisific_package.spisific_test* 
- to run all tests: python manage.py test
