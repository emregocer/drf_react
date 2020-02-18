from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework import viewsets
from .models import Note, Subject
from .serializers import NoteSerializer, UserSerializer, SubjectSerializer
from .permissions import IsOwner
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (
        permissions.IsAuthenticated,
        IsOwner,
    )
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = (
        "subject",
    )
    ordering_fields = ["created", "updated", "content"]
    search_fields = ["content"]
    ordering = ["-updated"]  # default ordering updated descending

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(owner=self.request.user)
        return query_set


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = (
        permissions.IsAuthenticated,
        IsOwner,
    )
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ["created", "updated", "name"]
    search_fields = ["name", "description"]
    ordering = ["-updated"]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(owner=self.request.user)
        return query_set


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)

