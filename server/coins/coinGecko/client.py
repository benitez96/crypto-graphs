
import requests

from coins.coin_chart import CoinChart

class CoinGeckoClient:
    
    def __init__(self, url):
        self.url = url
    
    def get_market_chart_data(
            self, coin_id, vs_currency, days=90
        ) -> CoinChart:
        endpoint = f"/coins/{coin_id}/market_chart"
        params = {
            "vs_currency": vs_currency,
            "interval": "daily",
            "days": days,
        }
        
        url = f"{self.url}{endpoint}"
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            return CoinChart(response.json())
        except requests.exceptions.RequestException as e:
            raise Exception(f"Error making the request: {e}")
