# urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.news_view, name='shop'),
    path('get_news/', views.get_news, name='get_news'),
]