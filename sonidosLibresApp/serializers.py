from django.contrib.auth.models import User
from rest_framework import serializers

from sonidosLibresApp.customFilters import AudioFilter
from .models import Audio, Category, Album, Commentary


class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category

class CommentarySerializer(serializers.ModelSerializer):
    class Meta:
        model=Commentary


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name','is_superuser', 'is_staff','is_active', 'groups')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
