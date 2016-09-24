from django.contrib import admin

from .models import Category, Audio, Commentary, Album

admin.site.register(Category)
admin.site.register(Audio)
admin.site.register(Commentary)
admin.site.register(Album)