# Generated by Django 5.0.2 on 2024-02-07 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0006_remove_category_toys'),
    ]

    operations = [
        migrations.AlterField(
            model_name='toy',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
