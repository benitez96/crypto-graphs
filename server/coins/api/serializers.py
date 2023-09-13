from rest_framework import serializers
from ..models import *


class HistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = History
        fields = [ 'date', 'price', 'market_cap', 'total_volume', 'id' ]

class ExchangeSerializer(serializers.ModelSerializer):

    coin = serializers.StringRelatedField()
    currency = serializers.StringRelatedField()
    histories = HistorySerializer(many=True, read_only=True)

    class Meta:
        model = Exchange
        fields = ['coin', 'currency', 'histories', 'id']

class CoinSerializer(serializers.ModelSerializer):

    class Meta:
        model = Coin
        fields = ['name', 'symbol', 'id']
