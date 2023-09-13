import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material"
import { CoinTable } from "../components/CoinTable"
import { useCoins } from "../hooks/useCoins"
import { useEffect, useState } from "react"



export const TablePage = () => {

  const [ coin, setCoin ] = useState('')
  const { data: coins, isLoading } = useCoins()

  if (isLoading) {
    return <div>Loading...</div>
  }


  if (coins) return (
    <Stack gap={5}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Select a coin</InputLabel>
        <Select
          labelId="select-label"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          label="Select a coin"
        >
          {
            coins.map( coin =>
              <MenuItem key={coin.id} value={coin.symbol}>{coin.name}</MenuItem>
            )
          }
        </Select>
      </FormControl>
      <CoinTable coin={ coin || coins[0].symbol }/>
    </Stack>
  )

}
