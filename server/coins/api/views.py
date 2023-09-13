from datetime import timedelta 
from django.utils import timezone
from rest_framework import generics, pagination

from coins.tasks import fetch_chart_data

from ..models import *
from .serializers import *
from .filters import *


class HistoryView(generics.ListAPIView):

    queryset = History.objects.all()
    filterset_class = HistoryFilterSet
    serializer_class = HistorySerializer
    ordering_fields = ['date', 'price', 'volume', 'market_cap']
    pagination_class = pagination.LimitOffsetPagination


    def get_queryset(self):
        coin = self.request.query_params.get('coin')
        currency = self.request.query_params.get('currency')

        if coin and currency:
            coin = Coin.objects.get(symbol=coin)
            currency, _ = Currency.objects.get_or_create(symbol=currency)

            exchange, created = Exchange.objects.get_or_create(coin=coin, currency=currency)

            if created or exchange.last_updated < timezone.now() - timedelta(minutes=10):
                fetch_chart_data.delay(coin.symbol, currency.symbol)

            return super().get_queryset()

        return History.objects.none()

    def list(self, request, *args, **kwargs):
        # __import__('pdb').set_trace()
        qs = self.get_queryset()
        response = super().list(request, *args, **kwargs)

        return response
