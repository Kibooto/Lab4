# Generated by Django 5.0.2 on 2024-02-06 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0004_remove_category_toys'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='toys',
            field=models.ManyToManyField(to='market.toy'),
        ),
    ]
