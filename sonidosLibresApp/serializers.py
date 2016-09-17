from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer
from .models import PuntoPrestamo, TipoBicicleta, Multa, Usuario, Bicicleta, TipoInfraccion

class PuntoPrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model=PuntoPrestamo

class TipoBicicletaSerializer(serializers.ModelSerializer):
    class Meta:
        model=TipoBicicleta

class MultaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Multa

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario

class BicicletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bicicleta

class TipoInfraccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoInfraccion

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

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('email', 'password')

class ErrorSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('error')
