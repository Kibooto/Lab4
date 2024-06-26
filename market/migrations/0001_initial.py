# Generated by Django 5.0.2 on 2024-02-06 20:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Toy',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=5)),
                ('stock', models.PositiveIntegerField()),
                ('image', models.ImageField(null=True, upload_to='toys')),
                ('age', models.PositiveIntegerField(default=0)),
                ('sex', models.CharField(verbose_name=((0, 'Хлопчик'), (1, 'Дівчинка'), (2, 'Для двох')))),
                ('code', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('foreign_key', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='market.category')),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='toys',
            field=models.ManyToManyField(related_name='categories', to='market.toy'),
        ),
        migrations.CreateModel(
            name='Basket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('toy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='market.toy')),
            ],
        ),
    ]
