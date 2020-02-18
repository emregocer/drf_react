# -*- coding: utf-8 -*-
from drf_api.settings.base import *

DEBUG = False

SECRET_KEY = get_env_variable("SECRET_KEY")

ALLOWED_HOSTS = [get_env_variable("SERVER_URL")]

CORS_ORIGIN_WHITELIST = [get_env_variable("CLIENT_URL")]


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": get_env_variable("DRF_DB_NAME"),
        "USER": get_env_variable("DRF_DB_USER"),
        "PASSWORD": get_env_variable("DRF_DB_PASSWORD"),
        "HOST": "localhost",
        "PORT": "5432",
    }
}

# settings for rest_framework_simplejwt

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("Bearer",),
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=2),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}
