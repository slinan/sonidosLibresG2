import django_filters

from sonidosLibresApp.models import Audio


class AudioFilter(django_filters.FilterSet):
    categories = django_filters.CharFilter(
        name='categories__name',
        lookup_type='contains',
    )

    class Meta:
        model = Audio
        fields = ('title', 'audio', 'categories')