import { useQuery } from "@tanstack/react-query"
import { api } from "../api"
import { Coin, CoinData, CoinExchange } from "../types/coindata"


type Props = {
  coin: string
  currency: string
}

const getCoinData = async (props: Props) => { 
  const params = new URLSearchParams(props)
  const { data } = await api.get<CoinData[]>('history/', {params})

  return data
}

const getCoins = async () => {
  const { data } = await api.get<Coin[]>('coins/')
  return data
}

const getExchanges = async () => {
  const { data } = await api.get<CoinExchange[]>('exchanges/')
  return data
}




export const useCoinChart = () => {

  {/* const { data: coins } = useQuery(['coins'], getCoins) */}

  const query = useQuery( ['exchanges'], getExchanges )


  {/* const query = useQuery( */}
  {/*   ['coinChart', { coin, currency }], */}
  {/*   () => getCoinData({ coin, currency }), */}
  {/* ) */}

  return query
}
