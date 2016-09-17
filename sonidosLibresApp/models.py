from django.db import models
from django.contrib.auth.models import User
import datetime
from django.utils import timezone

class PuntoPrestamo(models.Model):
    def __str__(self):
        return 'Punto: ' + self.nombre + ' - id: '+str(self.id)
    nombre = models.CharField(max_length=40)
    direccion = models.CharField(max_length = 60)

class TipoBicicleta(models.Model):
    def __str__(self):
        return 'Tipo: ' + self.nombre + ' - id: '+ str(self.id)
    nombre = models.CharField(max_length=40)
    descripcion = models.TextField(blank=True)

class Bicicleta(models.Model):
    def __str__(self):
        return 'Bicicleta: '+str(self.id)
    tipo = models.ForeignKey(TipoBicicleta, on_delete=models.CASCADE)
    puntoPrestamo = models.ForeignKey(PuntoPrestamo, blank=True, null=True)


class Usuario(models.Model):
    def __str__(self):
        return self.nombre + ' - id: '+str(self.id)
    TIPOS_USUARIO = (
            ('F', 'Funcionario'),
            ('U', 'Usuario'),
            ('A', 'Administrador')
        )
    tipoUsuario = models.CharField(max_length=1, choices=TIPOS_USUARIO)
    nombre = models.CharField(max_length=40)
    fechaNacimiento = models.DateField()
    email = models.CharField(max_length=60)
    password = models.CharField(max_length=60)


class TipoInfraccion(models.Model):
    def __str__(self):
        return self.tipo + ' - id: '+str(self.id)
    tipo = models.CharField(max_length=40)
    monto = models.DecimalField(max_digits=12, decimal_places=2)

class Multa(models.Model):
    def __str__(self):
        return str(self.tipoDeInfraccion) + ' - id: '+str(self.id)
    tipoDeInfraccion = models.ForeignKey(TipoInfraccion, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateField()

class UserProfile(models.Model):
        user = models.OneToOneField(User)
        # custom fields for user
        name = models.CharField(max_length=100)



    # python manage.py makemigrations bikes4FreeApp
    # python manage.py sqlmigrate bikes4FreeApp 0001
    # python manage.py migrate
    # python manage.py createsuperuser
    # $ heroku run python manage.py migrate