from django.db import models

from django.contrib.auth.models import User

class Basket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    toys = models.ManyToManyField('Toy', through='BasketItem')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class BasketItem(models.Model):
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE)
    toy = models.ForeignKey('Toy', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    # toys = models.ManyToManyField('Toy')

    def __str__(self):
        return self.name
    
choices = ((0, 'Хлопчик'), 
           (1, 'Дівчинка'), 
           (2, 'Для двох'))
    
class Toy(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to='toys', null=True)
    age = models.PositiveIntegerField(default=0)
    sex = models.CharField(choices)
    code = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    foreign_key = models.ForeignKey('Category', on_delete=models.CASCADE)


    def __str__(self):
        return self.name