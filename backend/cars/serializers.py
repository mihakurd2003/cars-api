from rest_framework import serializers

from .models import Car, CarPart, Country


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class CarPartSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarPart
        fields = ['id', 'name', 'brand', 'price', 'country']


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'
