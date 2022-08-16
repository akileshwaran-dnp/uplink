# uplink

## Running django project
1. Pre-requisites
- python v3.10
- pip v22.0.2
- django v4.1
- mysql v14.14

(visit [python3](https://www.python.org/downloads/), [pip](https://pip.pypa.io/en/stable/installation/), [django](https://docs.djangoproject.com/en/4.1/topics/install/#installing-an-official-release-with-pip) and [mysql](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04) for detailed instructions)
> **_NOTE:_**  Install django in venv

2. Setting up python virtual environment(venv)
- Creating a new virtual environment
```console
foo@bar:~/$ python3 -m venv djangodev
```
this will create a virtual environment named *django*

- Activating the virtual environment
```console
foo@bar:~/$ source ~/.virualenvs/djangodev/bin/activate
```

2. Installing additional packages
- rest_framework
```console
(djangodev)foo@bar:~/$ pip install django-rest_framework
```
- corsheaders
```console
(djangodev)foo@bar:~/$ pip install django-cors-headers
```
- mysqlclient
```console
(djangodev)foo@bar:~/$ pip install mysqlclient
```

- environ
```console
(djangodev)foo@bar:~/$ pip install django-environ
```

3. Create a seperate mysql user by following [these steps](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql)

4. Configuring the django project
- create a *.env* file within *django/files/* define your mysql connection settings
```
DB_USER=your_username
DB_NAME=your_db_name
DB_PASS=your_db_password
DB_HOST=mysql_server_host
DB_PORT=mysql_server_port
```

5. Migrations
```console
(djangodev)foo@bar:~/django/uplink/$ python3 manage.py makemigrations
(djangodev)foo@bar:~/django/uplink/$ python3 manage.py migrate
```

6. Creating superuser for admin tasks
```console
(djangodev)foo@bar:~/django/uplink/$ python3 manage.py createsuperuser --username=your_superuser_name
```
(this will prompt a password for admin)

7. Running the project
```console
(djangodev)foo@bar:~/django/uplink/$ python3 manage.py runserver
```
( this will show something like this on your terminal )
```
Django version 4.1, using settings 'files.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

you can login to your [admin](http://127.0.0.1:8000/admin/) account and view the models

## Running React application
1. Pre-requisite
- node v14.19.3

2. Installing the required libraries listed in *package.json*
```console
foo@bar:~/react/$ npm install
```

3. Starting the react app
```console
foo@bar:~/react/$ npm start
```
you can now visit [uplink](http://localhost:3000/) in your browser

### attached some screenshots of the application
![image](https://user-images.githubusercontent.com/76486044/184814629-6b504b16-fc2a-4e8f-acc4-e103b3ded40f.png)
![image](https://user-images.githubusercontent.com/76486044/184814790-4d14e926-3ea0-4106-a6be-7017de87c755.png)



