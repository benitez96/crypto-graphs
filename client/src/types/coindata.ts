

export type CoinExchange = {
  id: number,
  coin: string,
  currency: string,
  histories: History[],
}


export type History = {
  id: number,
  date: Date,
  price: number,
  market_cap: number,
  total_volume: number,
}

export type Coin = {
  id: number
  symbol: string
  name: string
}
