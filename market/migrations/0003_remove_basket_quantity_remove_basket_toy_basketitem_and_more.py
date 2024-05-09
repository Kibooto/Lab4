# Generated by Django 5.0.2 on 2024-02-06 20:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0002_basket_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='basket',
            name='quantity',
        ),
        migrations.RemoveField(
            model_name='basket',
            name='toy',
        ),
        migrations.CreateModel(
            name='BasketItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('basket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='market.basket')),
                ('toy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='market.toy')),
            ],
        ),
        migrations.AddField(
            model_name='basket',
            name='toys',
            field=models.ManyToManyField(through='market.BasketItem', to='market.toy'),
        ),
    ]
