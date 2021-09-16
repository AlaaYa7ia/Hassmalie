# Hassmalie

application deployed here:

https://hassmalie.herokuapp.com/

## About:

The "Hassmalie" system was our graduation project in Hadassah academic collage. Supervised by Mr. Ihab Zahaika and Dr. Yoram Yekutieli. The system idea proposed by the company "Walid Haskiya Electrical Works Building and Industry".  In this project we developed a web application developed in parallel with a mobile application developed by another team. And both applications use the same database and API that we built.

Since all the solutions on the market do not meet the business need, the goal of the "Hassmalie" system is to help run the business digitally and replace the standard management method (on paper) used in the business. The web application enables business management, employee management and employee reporting. In addition, it allows project management, so that each project is linked to its own file repository, and linked to a bid that can be filled in manually, or by manually labeling the project's map

Our application meets important performance and security requirements, such as response time, storage space, password encryption and more. The technological tools we used for development are multifaceted, beginning with Django at the backend, React at the frontend and PostgreSQL as a database. 

There was a design complexity in building the application, for example building the database and manual tagging. And throughout the construction we encountered many practical difficulties like the coordination of work between Django and React, the deployment of the application and the sad user interface.

Finally, according to the results we have seen the application meets the requirements of the company, and the owners of the company are very satisfied with our work and they are interested in continuing to develop the system in order to use it.

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

