from io import StringIO

from django.http import Http404
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view, detail_route, list_route
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from sonidosLibresApp.serializers import TipoBicicletaSerializer, PuntoPrestamoSerializer, MultaSerializer, \
    UsuarioSerializer, BicicletaSerializer, TipoInfraccionSerializer, LoginSerializer
from .models import PuntoPrestamo, TipoBicicleta, Multa, Usuario, Bicicleta, TipoInfraccion
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, 'index.html')

class ListaTiposBicicleta(APIView):
    """
    Lista todos los tipos de bicicleta, o permite crear un nuevo tipo
    """
    def get(self, request, format=None):
        tipos = TipoBicicleta.objects.all().order_by('-id')
        serializer = TipoBicicletaSerializer(tipos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TipoBicicletaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InstanciaTipoBicicleta(APIView):
    """
    Permite hacer RUD sobre una instancia de TipoBicicleta
    """
    def get_object(self, pk):
        try:
            return TipoBicicleta.objects.get(pk=pk)
        except TipoBicicleta.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        tipo = self.get_object(pk)
        serializer = TipoBicicletaSerializer(tipo)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        tipo = self.get_object(pk)
        serializer = TipoBicicletaSerializer(tipo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        tipo = self.get_object(pk)
        tipo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ListaUsuarios(APIView):
    """
    Lista todos los tipos de bicicleta, o permite crear un nuevo tipo
    """
    def get(self, request, format=None):
        tipos = Usuario.objects.all().order_by('-id')
        serializer = UsuarioSerializer(tipos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            if Usuario.objects.filter(email = request.data.get('email')):
                message = 'El usuario ya se encuentra registrado en el sistema'
                response = JsonResponse({'error': message}, status=409)
                return response
            else:
              serializer.save()
              return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InstanciaUsuario(APIView):
    """
    Permite hacer RUD sobre una instancia de TipoBicicleta
    """
    def get_object(self, pk):
        try:
            return Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        tipo = self.get_object(pk)
        serializer = UsuarioSerializer(tipo)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        tipo = self.get_object(pk)
        serializer = UsuarioSerializer(tipo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        tipo = self.get_object(pk)
        tipo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class Login(APIView):
    def post(self, request, format=None):
        try:
            data = request.data
            emailParam = data.get('email')
            passwordParam = data.get('password')
            usuario = Usuario.objects.get(email= emailParam, password=passwordParam)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            message = 'El usuario no se encuentra registrado o el password es incorrecto'
            response = JsonResponse({'error': message}, status=401)
            return response

class BicicletasEnPunto(APIView):
    def get(self, request, pk, format=None):
        responseData = {}
        for t in TipoBicicleta.objects.all():
            responseData[t.nombre]=str((Bicicleta.objects.filter(puntoPrestamo__id=pk, tipo=t.id)).count())
        response = JsonResponse(responseData, status=200)
        return response

class NumBicicletasTipo(APIView):
    def get(self, request, pk1, pk2):
        num = Bicicleta.objects.filter(puntoPrestamo=pk1, tipo=pk2).count()
        content = {'numeroBicicletas': num}
        return Response(content)

class BicicletasTipo(APIView):
    def get(self, request, pk1, pk2):
        bicicletas = Bicicleta.objects.filter(puntoPrestamo=pk1, tipo=pk2)
        serializer = BicicletaSerializer(bicicletas, many=True)
        return Response(serializer.data)

## ViewSets
class PuntoPrestamoViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = PuntoPrestamo.objects.all()
    serializer_class = PuntoPrestamoSerializer

class MultaViewSet(viewsets.ModelViewSet):
    queryset = Multa.objects.all().order_by('-id')
    serializer_class = MultaSerializer

class BicicletaViewSet(viewsets.ModelViewSet):
    queryset = Bicicleta.objects.all().order_by('-id')
    serializer_class = BicicletaSerializer

class TipoInfraccionViewSet(viewsets.ModelViewSet):
    queryset = TipoInfraccion.objects.all().order_by('-id')
    serializer_class = TipoInfraccionSerializer
