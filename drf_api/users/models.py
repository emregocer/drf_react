# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _

class CustomUser(AbstractUser):
    username = models.CharField(_('username'), max_length=36, blank=False, unique=True,
    error_messages={
            'unique': _("A user with that username already exists."),
        }
    )

    email = models.EmailField(_('email address'), blank=False, unique=True,
        help_text="Email is required.",
        error_messages={
            'unique': _("A user with that email already exists."),
        })
