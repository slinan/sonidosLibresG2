from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from sonidosLibresApp import views

router = DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^audios/$', views.AudioList.as_view()),
    url(r'^audios/(?P<pk>[0-9]+)/$', views.AudioDetail.as_view()),
    url(r'^categories/$', views.CategoryList.as_view()),
    url(r'^categories/(?P<pk>[0-9]+)/$', views.CategoryDetail.as_view()),
    url(r'^albums/$', views.AlbumList.as_view()),
    url(r'^albums/(?P<pk>[0-9]+)/$', views.AlbumDetail.as_view()),
    url(r'^commentaries/$', views.CommentaryList.as_view()),
    url(r'^commentaries/(?P<pk>[0-9]+)/$', views.CommentaryDetail.as_view()),
]

#urlpatterns =format_suffix_patterns(urlpatterns)
urlpatterns += router.urls
