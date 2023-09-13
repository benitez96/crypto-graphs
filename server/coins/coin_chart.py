from datetime import date, datetime

class CoinChart:

    def __init__(self, data):
        self.data = data

    @property
    def prices(self):
        return [Price(value, date) for date, value in self.data["prices"]]

    @property
    def market_caps(self):
        return [Price(value, date) for date, value in self.data["market_caps"]]

    @property
    def total_volumes(self):
        return [Price(value, date) for date, value in self.data["total_volumes"]]


class Price:

    def __init__(self, value: str, date: float):
        self._value = value
        self._date = date

    @property
    def value(self):
        return self._value

    @property
    def date(self):
        return date.fromtimestamp(self._date / 1000)
