from django.utils import timezone
from celery import shared_task
from coins.coinGecko.client import CoinGeckoClient
from coins.models import Coin, Currency, Exchange, History


@shared_task
def fetch_chart_data(coin, currency, days=90):
    try:
        coin = Coin.objects.get(symbol=coin)
        currency = Currency.objects.get(symbol=currency)

        gecko_client = CoinGeckoClient("https://api.coingecko.com/api/v3")
        chart_data = gecko_client.get_market_chart_data(coin.external_id, currency.symbol, days)

        exchange, _ = Exchange.objects.get_or_create(coin=coin, currency=currency)

        for price, caps, vol in zip(chart_data.prices, chart_data.market_caps, chart_data.total_volumes):
            History.objects.update_or_create(
                exchange=exchange,
                date=price.date,
                defaults={
                    'price': price.value,
                    'market_cap': caps.value,
                    'total_volume': vol.value
                }
            )

        print("Chart data fetched for %s/%s" % (coin.symbol, currency.symbol))
        exchange.last_updated = timezone.now()
        exchange.save()

    except Exception as e:
        print(e)

