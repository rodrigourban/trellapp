This project was created all by Rodrigo Urban

## How to install

There are a couple of things you need to do in order to get this working, but don't be afraid.

### Django server

First of all you need to create a python virtual enviroment in order to run the server.
Open the terminal in the project's folder and run
> virtualenv venv

This will create a virtualenv. To activate it:

Windows: > venv\Scripts\activate
Linux: > source venv\bin\activate

Now we need to install all the dependencies.

> pip install -r requirements.txt

After that all is left to do is migrate the database

> python manage.py makemigrations
> python manage.py migrate

The server is set up, to run it:

> python manage.py runserver

### Client

This is easier. Luckly.

Run in your terminal

> npm install
> npm run start

Happy programming. Rodrigo.