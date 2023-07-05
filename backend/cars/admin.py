from django.contrib import admin
from cars.models import Car, Country, CarPart


class CarInline(admin.TabularInline):
    model = Car.spare_parts.through
    raw_id_fields = ['car']
    extra = 0


class CarCountryInline(admin.TabularInline):
    model = Car
    extra = 0


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ['brand', 'model', 'price']
    list_editable = ['price']


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ['name', 'capital', 'phone_code']
    inlines = [CarCountryInline]


@admin.register(CarPart)
class CarPartAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'price']
    list_editable = ['price']
    inlines = [CarInline]

