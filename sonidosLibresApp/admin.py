from django.contrib import admin

from .models import PuntoPrestamo, TipoBicicleta, Bicicleta, Usuario

admin.site.register(PuntoPrestamo)
admin.site.register(TipoBicicleta)
admin.site.register(Bicicleta)
admin.site.register(Usuario)