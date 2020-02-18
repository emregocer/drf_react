from django.core.management.base import BaseCommand

from users.factory import UserFactory
from notes.factory import NoteFactory, SubjectFactory


class Command(BaseCommand):
    help = "Seeds the database."

    def add_arguments(self, parser):
        parser.add_argument(
            "--subject",
            default=10,
            type=int,
            help="The number of subject seed data to create.",
        )
        parser.add_argument(
            "--note",
            default=20,
            type=int,
            help="The number of note seed data to create.",
        )

    def handle(self, *args, **options):
        test_user = UserFactory.create()

        subjects = SubjectFactory.create_batch(options["subject"], owner=test_user)
        for subject in subjects:
            NoteFactory.create_batch(options["note"], subject=subject, owner=test_user)

