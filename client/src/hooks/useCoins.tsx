import { useQuery } from "@tanstack/react-query"
import { api } from "../api"
import { Coin } from "../types/coindata"


const getCoins = async () => {
  const { data } = await api.get<Coin[]>('coins/')
  return data
}

export const useCoins = () => {

  const query = useQuery(['coins'], getCoins)

  return query
}
