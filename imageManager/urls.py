# urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('<str:image_name>/', views.get_image, name='shop'),
]