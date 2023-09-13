
from django.urls import path

from .views import *

urlpatterns = [
    path('history/', HistoryView.as_view(), name='history'),
    path('exchanges/', ExchangeView.as_view(), name='exchange'),
    path('coins/', CoinView.as_view(), name='coin'),

]


