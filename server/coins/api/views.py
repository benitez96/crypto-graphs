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


class ExchangeView(generics.ListAPIView):

    serializer_class = ExchangeSerializer
    queryset = Exchange.objects.all()

    def get_queryset(self):
        qs = super().get_queryset()
        for exchange in qs:
            if exchange.last_updated < timezone.now() - timedelta(minutes=10):
                fetch_chart_data.delay(exchange.coin.symbol, exchange.currency.symbol)

        return qs


class CoinView(generics.ListAPIView):

    serializer_class = CoinSerializer
    queryset = Coin.objects.all()




