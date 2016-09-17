from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from sonidosLibresApp import views
from sonidosLibresApp.views import PuntoPrestamoViewSet, TipoInfraccionViewSet, MultaViewSet, BicicletaViewSet

router = DefaultRouter()
router.register(r'puntosPrestamo', PuntoPrestamoViewSet)
router.register(r'tiposInfraccion', TipoInfraccionViewSet)
router.register(r'multas', MultaViewSet)
router.register(r'bicicletas', BicicletaViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^tiposBicicleta/$', views.ListaTiposBicicleta.as_view()),
    url(r'^tiposBicicleta/(?P<pk>[0-9]+)/$', views.InstanciaTipoBicicleta.as_view()),
    url(r'^bicicletasEnPunto/(?P<pk>[0-9]+)/$', views.BicicletasEnPunto.as_view()),
    url(r'^puntosPrestamo/(?P<pk1>[0-9]+)/numBicicletasTipo/(?P<pk2>[0-9]+)$', views.NumBicicletasTipo.as_view()),
    url(r'^puntosPrestamo/(?P<pk1>[0-9]+)/bicicletasTipo/(?P<pk2>[0-9]+)$', views.BicicletasTipo.as_view()),
    url(r'^usuarios/$', views.ListaUsuarios.as_view()),
    url(r'^usuarios/(?P<pk>[0-9]+)/$', views.InstanciaUsuario.as_view()),
    url(r'^login/$', views.Login.as_view()),
]

#urlpatterns =format_suffix_patterns(urlpatterns)
urlpatterns += router.urls
