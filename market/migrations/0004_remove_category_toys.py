# Generated by Django 5.0.2 on 2024-02-06 20:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0003_remove_basket_quantity_remove_basket_toy_basketitem_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='toys',
        ),
    ]
