import React from 'react';
import Image from 'next/image';
import tw from 'tailwind-styled-components';

function CoinRow({ coin, bal }) {
  const alo = ((coin.balance / bal) * 100).toPrecision(2);
  const img = `/${coin.logo}.png`;
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  return (
    <tr className="whitespace-nowrap h-full w-full">
      <td className="mr-2 mt-2 flex justify-evenly items-center px-5 py-6">
        <Image src={img} width={100} height={100} objectFit="contain" />
        <div className="mb-0.5 ml-2 font-medium text-base">
          <div>{coin.name}</div>
          <div className="text-sm text-gray-500 font-semibold">
            {coin.symbol}
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex flex-col items-center">
          <div className="mb-0.5 ml-2 font-medium text-base">
            {numberFormat(coin.balance)}
          </div>
          <div className="text-sm text-gray-500 font-semibold">
            {coin.amount}
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex flex-col items-center">
          <div className="mb-0.5 ml-2 font-medium text-base">
            {'₹'}
            {coin.price}
          </div>
          <div
            className={
              coin.change < 0
                ? 'text-red-500 text-lg'
                : 'text-emerald-500 text-lg'
            }
          >
            {coin.change > 0 && '+'}
            {coin.change}%
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="text-semibold">{alo}%</div>
      </td>
    </tr>
  );
}

export default CoinRow;
