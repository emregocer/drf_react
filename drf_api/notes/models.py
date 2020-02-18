from django.db import models
from django.core.validators import MinLengthValidator
from django.conf import settings

class BaseModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)   # timezone.now() when created
    updated = models.DateTimeField(auto_now=True)       # with every update

    class Meta:
        abstract = True

class Subject(BaseModel):
    name = models.CharField(max_length=64, validators=[MinLengthValidator(4, "Subject name is too short.")])
    description = models.CharField(max_length=128, validators=[MinLengthValidator(4, "Subject description too short.")])
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='subjects', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Note(BaseModel):
    content = models.CharField(max_length=255, validators=[MinLengthValidator(4, "Note content is too short.")])
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='notes', on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    def __str__(self):
        return self.content
