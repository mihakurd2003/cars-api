from django.db import models
from django.core.validators import MinValueValidator


class Car(models.Model):
    brand = models.CharField(
        'Марка',
        max_length=50
    )
    model = models.CharField(
        'Модель',
        max_length=50
    )
    price = models.IntegerField(
        'Цена',
        db_index=True,
        validators=[MinValueValidator(0)],
    )
    country = models.ForeignKey(
        'Country',
        verbose_name='Страна производства',
        on_delete=models.CASCADE,
        related_name='cars',
    )
    spare_parts = models.ManyToManyField(
        'CarPart',
        verbose_name='Запчасти',
        related_name='cars',
    )

    class Meta:
        verbose_name = 'Автомобиль'
        verbose_name_plural = 'Автомобили'

    def __str__(self):
        return f'{self.brand} {self.model}'


class Country(models.Model):
    name = models.CharField(
        'Название',
        max_length=30,
        unique=True,
    )
    capital = models.CharField(
        'Столица',
        max_length=30,
        unique=True,
    )
    phone_code = models.IntegerField(
        'Телефонный код',
        unique=True,
        validators=[MinValueValidator(0)]
    )

    class Meta:
        verbose_name = 'Страна'
        verbose_name_plural = 'Страны'

    def __str__(self):
        return self.name


class CarPart(models.Model):
    name = models.CharField(
        'Название',
        max_length=100,
        db_index=True,
    )
    brand = models.CharField(
        'Марка',
        max_length=30,
        db_index=True,
    )
    description = models.TextField('Описание', null=True, blank=True)
    price = models.IntegerField(
        'Цена',
        db_index=True,
    )
    country = models.ForeignKey(
        'Country',
        verbose_name='Страна производства',
        on_delete=models.CASCADE,
        related_name='car_parts',
    )

    class Meta:
        verbose_name = 'Запчасть'
        verbose_name_plural = 'Запчасти'

    def __str__(self):
        return f'{self.name} {self.brand}'




