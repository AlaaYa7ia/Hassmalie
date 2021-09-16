# Hassmalie

## How to run the application (windows):
1- Clone the repository. 
2- Cd to hashmalie/ sittings.py folder 
3- Set the following settings according: a. SECRET_KEY = 'your django application secret key' b. EMAIL_PORT = *port number* c. EMAIL_HOST_USER = 'your host email ex: emailhost@gmail.com' d. EMAIL_HOST_PASSWORD = 'your host email password ex: abcdefghijklmnop' 
4- Run: npm run install, this will create a new package called node_modules in the reacthassmalie folder. 
5- open a new terminal 
6- Activate your python virtual environment, see Python's documentation 
7- run: pip install -r requirements.txt 
8- in the backend terminal run: python manage.py makemigrations 
9- then run: python manage.py migrate Note: you need to run steps 8 and 9 only once in order to configure your database. for more information about Django migrations see documentation 
10- then run: python manage.py runserver now you have your backend server running at http://localhost:8000/ 
11- in the frontend terminal (reacthassmalie) run: npm run start now you have your frontend running at http://localhost:3000/

## tests: 
1- to run spisific test or collection of tests run the command : python manage.py test spisific_package.spisific_test 
2- to run all tests: python manage.py test
