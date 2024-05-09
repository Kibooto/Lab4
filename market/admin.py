from django.contrib import admin

# Register your models here.
from .models import Category, Toy, Basket, BasketItem

admin.site.register(Category)
admin.site.register(Toy)
admin.site.register(Basket)
admin.site.register(BasketItem)