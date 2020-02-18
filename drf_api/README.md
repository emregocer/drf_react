## drf_api

Define credentials and other variables in .env.dev.\
There's a custom seed command that uses factory_boy to seed the db.\
Install dev dependencies if you want to use the seed command.

pipenv install [--dev]\
PIPENV_DOTENV_LOCATION=.env.dev pipenv shell\
python manage.py migrate\
python manage.py seed\
python manage.py runserver

Test user created by seed command is -> user0 / pass