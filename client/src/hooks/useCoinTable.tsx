import { useQuery } from "@tanstack/react-query"
import { api } from "../api"
import { PaginatedHistory } from "../types/coindata"
import { useState } from "react"


type Props = {
  coin: string
  currency: string
  limit: string
  offset: string
}

const getCoinData = async (props: Props) => { 
  const params = new URLSearchParams(props)
  params.append('ordering', '-date')
  const { data } = await api.get<PaginatedHistory>('history/?', {params})
  return data
}

export const useCoinTable = ({ coin, currency, limit: initialLimit, offset: initialOffset }: Props) => {


  const [ limit, setLimit ] = useState(initialLimit)
  const [ offset, setOffset ] = useState(initialOffset)

  const handleLimitChange = ( newLimit: string ) => {
    setLimit(newLimit)
    setOffset('0')
  }

  const handleChangePage = ( page:number ) => {
    setOffset( (parseInt(limit) * page).toString() )
  }

  const query = useQuery(
    ['coin-table', { coin, currency, limit, offset }],
    () => getCoinData({ coin, currency, limit, offset }),
    {
      keepPreviousData: true,
    }
  )

  return {
    ...query,
    limit,
    offset,
    handleChangePage,
    handleLimitChange,
  }
}
