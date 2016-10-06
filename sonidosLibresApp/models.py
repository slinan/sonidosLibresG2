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
    image = models.URLField()

class Artist(models.Model):
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = "artists"

    name = models.CharField(max_length=40)
    user = models.OneToOneField(User, null=True, blank=True)
    image = models.URLField()

class Album (models.Model):
    def __str__(self):
        return self.title
    title = models.CharField(max_length=100)
    rating = models.FloatField()
    numOfRatings = models.IntegerField()
    categories = models.ManyToManyField(Category,related_name="albums")
    artists = models.ManyToManyField(Artist, related_name="albums")

class Audio(models.Model):
    def __str__(self):
        return self.title
    title = models.CharField(max_length=40)
    audioDownload = models.URLField()
    audioPlay = models.URLField()
    playCount = models.IntegerField()
    downloadsCount = models.IntegerField()
    rating = models.FloatField()
    numOfRatings = models.IntegerField()
    categories = models.ManyToManyField(Category,related_name="audios")
    uploadDate = models.DateField()
    album = models.ManyToManyField(Album, related_name="audios")
    artists = models.ManyToManyField(Artist, related_name="audios")

class Commentary (models.Model):
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = "commentaries"
    commentary = models.TextField()
    date = models.DateField()
    audio = models.ForeignKey(Audio,on_delete=models.CASCADE)
    user = models.OneToOneField(User, null=True, blank=True)

    # python manage.py makemigrations sonidosLibresApp
    # python manage.py sqlmigrate sonidosLibresApp 0001
    # python manage.py migrate
    # python manage.py createsuperuser
    # $ heroku run python manage.py migrate --app sonidoslibres