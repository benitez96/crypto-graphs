import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useCoinChart } from '../hooks/useCoinChart';

export const TimeSeriesChart = () => {


  const { data, isLoading } = useCoinChart()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const chartData = {
    options: {
      chart: {
        id: 'time-series',
        type: 'line',
        height: 350,
      },
      xaxis: {
        type: 'datetime',
      },
      title: {
        text: `Crypto Price History vs USD`,
        align: 'center',
      },
    },
    series: data!.map(coin => ({
      name: coin.coin.toUpperCase(),
      data: coin.histories.map(h => ({ x: new Date(h.date).getTime(), y: h.price }))
    })),
  };


  return (
    <div className="time-series-chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default TimeSeriesChart;
