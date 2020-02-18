from rest_framework import serializers

from django.conf import settings
from .models import Note, Subject


class NoteSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all(), required=True)

    class Meta:
        model = Note
        fields = ('id', 'url', 'content', 'subject', 'owner', 'created', 'updated')

class SubjectSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Subject
        fields = ('id', 'url', 'name', 'description', 'owner', 'created', 'updated')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    notes = serializers.PrimaryKeyRelatedField(
        many=True,  read_only=True)
    subjects = serializers.PrimaryKeyRelatedField(
        many=True,  read_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('id', 'url', 'username', 'first_name', 'last_name', 'email', 'notes', 'subjects',)
