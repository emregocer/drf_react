# notes/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from notes import views
from rest_framework.schemas import get_schema_view

schema_view = get_schema_view(title='Note API')

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'notes', views.NoteViewSet)
router.register(r'subjects', views.SubjectViewSet)
router.register(r'users', views.UserViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('schema/', schema_view),
    path('', include(router.urls)),
]