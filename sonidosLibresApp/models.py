from django.db import models
from django.contrib.auth.models import User
import datetime
from django.utils import timezone

class UserProfile(models.Model):
        user = models.OneToOneField(User)
        # custom fields for user
        name = models.CharField(max_length=100)

####

class Category(models.Model):
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = "categories"

    name = models.CharField(max_length=40)

class Album (models.Model):
    title = models.CharField(max_length=100)
    rating = models.IntegerField()
    numOfRatings = models.IntegerField()
    categories = models.ManyToManyField(Category,related_name="albums")

class Audio(models.Model):
    def __str__(self):
        return self.title
    title = models.CharField(max_length=40)
    audio = models.URLField()
    playCount = models.IntegerField()
    downloadsCount = models.IntegerField()
    rating = models.IntegerField()
    numOfRatings = models.IntegerField()
    categories = models.ManyToManyField(Category,related_name="audios")
    uploadDate = models.DateField()
    album = models.ForeignKey(Album, blank=True, null=True)

class Commentary (models.Model):
    class Meta:
        verbose_name_plural = "commentaries"
    commentary = models.TextField()
    date = models.DateField()
    audio = models.ForeignKey(Audio,on_delete=models.CASCADE)

    # python manage.py makemigrations sonidosLibresApp
    # python manage.py sqlmigrate sonidosLibresApp 0001
    # python manage.py migrate
    # python manage.py createsuperuser
    # $ heroku run python manage.py migrate --app sonidoslibres