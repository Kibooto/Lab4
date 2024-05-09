# urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.market_view, name='shop'),
    path('get_toys/', views.get_toys, name='get_toys'),
]