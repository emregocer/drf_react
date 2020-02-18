import factory
import factory.django
from .models import CustomUser

from django.contrib.auth.hashers import make_password


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CustomUser

    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    username = factory.Sequence(lambda n: "user%d" % n)
    password = "pass"
    is_staff = False
    is_superuser = False

    @factory.lazy_attribute
    def email(self):
        return "%s_%s@example.com" % (self.first_name, self.last_name)

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        """Override the default ``_create`` with our custom call."""
        kwargs["password"] = make_password(kwargs["password"])
        return super(UserFactory, cls)._create(model_class, *args, **kwargs)

    class Params:
        flag_is_superuser = factory.Trait(
            is_superuser=True,
            is_staff=True,
            username=factory.Sequence(lambda n: "admin%d" % n),
            password="admin",
        )

        flag_is_staff = factory.Trait(
            is_staff=True,
            username=factory.Sequence(lambda n: "staff%d" % n),
            password="staff",
        )
