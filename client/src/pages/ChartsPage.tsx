import { Box } from "@mui/material"
import { TimeSeriesChart } from "../components/TimesSeriesChart"



export const ChartsPage = () => {

  return (
    <Box sx={{ color: 'black' }} mt={20}>
      <TimeSeriesChart />
    </Box>
  )
}
