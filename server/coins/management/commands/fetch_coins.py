from django.core.management.base import BaseCommand
from coins.models import Coin
import requests

class Command(BaseCommand):
    help = 'Fetch coins from CoinGecko API and filter by coin_ids'


    def add_arguments(self, parser):
        parser.add_argument('coin_ids', nargs='+', type=str, help='Coin symbols to fetch')

    def handle(self, *args, **options):
        coin_ids = options['coin_ids']
        self.fetch_and_filter_coins(coin_ids)

    def fetch_and_filter_coins(self, coin_ids):
        api_url = 'https://api.coingecko.com/api/v3/coins/list?include_platform=false'

        try:
            response = requests.get(api_url)
            response.raise_for_status()
            coins_data = response.json()

            created_coins = 0
            for c_data in coins_data:
                if c_data['symbol'] in coin_ids:
                    _, created = Coin.objects.get_or_create(
                        symbol=c_data['symbol'],
                        defaults={
                            'external_id':c_data['id'], 
                            'name':c_data['name'], 
                        }
                    )

                    if created: created_coins += 1

            print(f'Created {created_coins} coins')

        except requests.exceptions.RequestException as e:
            self.stdout.write(self.style.ERROR(f'Error making the request: {e}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error: {e}'))
