import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination, Typography } from '@mui/material';
import { useCoinTable } from '../hooks/useCoinTable';


type Props = {
  coin: string
}

export const CoinTable = ({ coin }: Props) => {

  const { 
    data, 
    isLoading,
    limit,
    offset,
    handleChangePage,
    handleLimitChange,
  } = useCoinTable({ coin, currency: 'usd', limit: '10', offset: '0' })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if ( coin === '' || !data ) return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Ups! No data to show
    </Typography>
  )

  if (data) return (
    <div>
      <Typography variant='h6' textAlign='center' mb={2}>
        { coin.toUpperCase() } vs USD
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total volume</TableCell>
              <TableCell align="right">Market cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.results.map( row => 
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date.toString().slice(0,10)}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.total_volume}</TableCell>
                  <TableCell align="right">{row.market_cap}</TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data.count}
        rowsPerPage={parseInt(limit)}
        page={parseInt(offset) / parseInt(limit)}
        onPageChange={(_, page) => handleChangePage(page)}
        onRowsPerPageChange={(e) => handleLimitChange(e.target.value)}
      />
    </div>
  );
}
