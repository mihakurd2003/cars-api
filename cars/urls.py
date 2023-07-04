from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'cars', views.CarsView, basename='cars')
router.register(r'car-parts', views.CarPartsView, basename='car_parts')
router.register(r'countries', views.CountryView, basename='country')

urlpatterns = router.urls
