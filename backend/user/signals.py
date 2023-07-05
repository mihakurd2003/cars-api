from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=User)
def fill_token(sender, instance, created, **kwargs):
    if created or not Token.objects.filter(user=instance).exists():
        Token.objects.create(user=instance)
