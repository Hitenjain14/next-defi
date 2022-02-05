//@ts-nocheck
import tw from 'tailwind-styled-components';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import React from 'react';
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks';

const data = {
  labels: [
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
  ],
  datasets: [
    {
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#3773f5',
      borderColor: '#3773f5',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#3773f5',
      pointBackgroundColor: '#3773f5',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#3773f5',
      pointHoverBorderColor: '#3773f5',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 90, 55, 45, 67, 89, 95, 78, 68, 58, 67, 65, 47, 89],
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

function BalanceChart() {
  const { address } = useWeb3();
  if (!address) {
    return (
      <Wrapper>
        <div className="text-4xl font-mono tracking-wide w-100 h-100 text-blue-500 font-bold p-24">
          Connect your Wallet to see your portfolio
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Line data={data} options={options} width={450} height={300} />
    </Wrapper>
  );
}

const Wrapper = tw.div`

`;

export default BalanceChart;
