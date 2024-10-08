# Generated by Django 4.2.2 on 2023-06-23 20:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True, verbose_name='Название')),
                ('capital', models.CharField(db_index=True, max_length=30, verbose_name='Столица')),
                ('phone_code', models.IntegerField(db_index=True, verbose_name='Телефонный код')),
            ],
            options={
                'verbose_name': 'Страна',
                'verbose_name_plural': 'Страны',
            },
        ),
        migrations.CreateModel(
            name='CarPart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=100, verbose_name='Название')),
                ('brand', models.CharField(db_index=True, max_length=30, verbose_name='Марка')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание')),
                ('price', models.IntegerField(db_index=True, verbose_name='Цена')),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='car_parts', to='cars.country', verbose_name='Страна производства')),
            ],
            options={
                'verbose_name': 'Запчасть',
                'verbose_name_plural': 'Запчасти',
            },
        ),
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand', models.CharField(max_length=50, verbose_name='Марка')),
                ('model', models.CharField(max_length=50, verbose_name='Модель')),
                ('price', models.IntegerField(db_index=True, verbose_name='Цена')),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cars', to='cars.country', verbose_name='Страна производства')),
                ('spare_parts', models.ManyToManyField(related_name='cars', to='cars.carpart', verbose_name='Запчасти')),
            ],
            options={
                'verbose_name': 'Автомобиль',
                'verbose_name_plural': 'Автомобили',
            },
        ),
    ]
