import { useQuery } from "@tanstack/react-query"
import { api } from "../api"
import { Coin, CoinExchange } from "../types/coindata"


const getExchanges = async () => {
  const { data } = await api.get<CoinExchange[]>('exchanges/')
  return data
}

export const useCoinChart = () => useQuery( ['exchanges'], getExchanges )
