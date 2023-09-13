from django_filters import rest_framework as filters

from ..models import *

class HistoryFilterSet(filters.FilterSet):

    class Meta:
        model = History
        fields = []

    coin = filters.CharFilter(
        field_name='exchange__coin__symbol', 
        lookup_expr='iexact', 
        label='Coin symbol. eg: btc, eth'
    )

    currency = filters.CharFilter(
        field_name='exchange__currency__symbol', 
        lookup_expr='iexact', 
        label='Currency symbol. eg: usd, ars'
    )
