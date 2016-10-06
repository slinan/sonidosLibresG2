from django.http import Http404
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.decorators import api_view, detail_route, list_route
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from sonidosLibresApp import customFilters
from rest_framework import filters
from sonidosLibresApp.customPagination import StandardResultsSetPagination
from sonidosLibresApp.serializers import AudioSerializer, CategorySerializer, AlbumSerializer, CommentarySerializer, \
    ArtistSerializer
from .models import Audio, Category, Album, Commentary, Artist
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, 'index.html')

class AudioList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer
    filter_backends = (filters.DjangoFilterBackend,filters.OrderingFilter,)
    pagination_class = StandardResultsSetPagination
    filter_fields = ('title', 'categories')
    ordering_fields = ('title', 'rating')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class AudioDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class ArtistList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class ArtistDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class CategoryList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class CategoryDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class AlbumList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    filter_backends = (filters.DjangoFilterBackend,filters.OrderingFilter,)
    pagination_class = StandardResultsSetPagination
    filter_fields = ('title', 'rating', 'categories')
    ordering_fields = ('title', 'rating')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class AlbumDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class CommentaryList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Commentary.objects.all()
    serializer_class = CommentarySerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class CommentaryDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Commentary.objects.all()
    serializer_class = CommentarySerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class AudioAlbumAssociation(APIView):
    def get(self,request,idAudio, idAlbum,format=None):
        audio = Audio.objects.get(id=idAudio)
        album = Album.objects.get(id=idAlbum)
        album.audios.add(audio)
        serializer = AudioSerializer(audio)
        return Response(serializer.data)

    def delete(self, request, idAudio, idAlbum, format=None):
        audio = Audio.objects.get(id=idAudio)
        album = Album.objects.get(id=idAlbum)
        album.audios.remove(audio)
        serializer = AudioSerializer(audio)
        return Response(serializer.data)

class RateAudio(APIView):
    def get(self,request,idAudio, rating,format=None):
        audio = Audio.objects.get(id=idAudio)
        newRate = ((audio.rating * audio.numOfRatings) + int(rating))/(audio.numOfRatings + 1)
        audio.rating=newRate
        audio.numOfRatings += 1
        audio.save()
        serializer = AudioSerializer(audio)
        return Response(serializer.data)

class RateAlbum(APIView):
    def get(self,request,idAlbum, rating,format=None):
        album = Album.objects.get(id=idAlbum)
        newRate = ((album.rating * album.numOfRatings) + int(rating))/(album.numOfRatings + 1)
        album.rating=newRate
        album.numOfRatings += 1
        album.save()
        serializer = AlbumSerializer(album)
        return Response(serializer.data)
