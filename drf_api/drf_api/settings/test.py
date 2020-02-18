# -*- coding: utf-8 -*-
from drf_api.settings.base import *

SECRET_KEY = "erm$3_$cglntyp6so$0g=1j3i!z_r5=pxy72tzyy520^-1)&ps"

DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1", "localhost"]

CORS_ORIGIN_WHITELIST = [get_env_variable("CLIENT_DOMAIN")]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}

"""
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
"""

# settings for rest_framework_simplejwt

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("Bearer",),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}
