from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer

from sonidosLibresApp.customFilters import AudioFilter
from .models import Audio, Category, Album


class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category

class UserSerializer(UserDetailsSerializer):

    name = serializers.CharField(source="userprofile.name")

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('name',)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        name = profile_data.get('name')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and name:
            profile.name = name
            profile.save()
        return instance
