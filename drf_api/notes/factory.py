import factory
import factory.django
import factory.fuzzy
from . import models
from datetime import datetime, timezone
from django.contrib.auth.hashers import make_password


class SubjectFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Subject

    created = factory.fuzzy.FuzzyDateTime(datetime(2019, 1, 1, tzinfo=timezone.utc))

    @factory.lazy_attribute
    def updated(self):
        # start date from the time created
        factory.fuzzy.FuzzyDateTime(self.created)

    name = factory.Faker("sentence")
    description = factory.Faker("sentence")


class NoteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Note

    created = factory.fuzzy.FuzzyDateTime(datetime(2019, 1, 1, tzinfo=timezone.utc))

    @factory.lazy_attribute
    def updated(self):
        # start date from the time created
        factory.fuzzy.FuzzyDateTime(self.created)

    content = factory.Faker("text")

