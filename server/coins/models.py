from django.db import models

class Coin(models.Model):
    name = models.CharField(max_length=255)
    symbol = models.SlugField(max_length=255)
    external_id = models.CharField(max_length=255)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.symbol

class Currency(models.Model):
    symbol = models.SlugField(max_length=255)

    def __str__(self):
        return self.symbol

class Exchange(models.Model):
    coin = models.ForeignKey(Coin, related_name='charts', on_delete=models.PROTECT)
    currency = models.ForeignKey(Currency, on_delete=models.PROTECT)
    last_updated = models.DateTimeField(auto_now=True)

class History(models.Model):
    exchange = models.ForeignKey(Exchange, related_name='histories', on_delete=models.PROTECT)
    date = models.DateField()
    price = models.DecimalField(max_digits=20, decimal_places=2)
    market_cap = models.DecimalField(max_digits=20, decimal_places=2)
    total_volume = models.DecimalField(max_digits=20, decimal_places=2)
