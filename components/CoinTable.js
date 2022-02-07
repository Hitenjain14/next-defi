import React from 'react';
import Image from 'next/image';
import CoinRow from './CoinRow';
import tw from 'tailwind-styled-components';
import BalanceChart from './BalanceChart';
import { IoRocketSharp } from 'react-icons/io5';
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks';
import { useSelector } from 'react-redux';
import { selectUser, selectTotal } from '../slices/userSlice';

function CoinTable({ coins }) {
  const info = useSelector(selectUser);
  const balance = useSelector(selectTotal);
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  const { address } = useWeb3();
  return (
    <div
      className="flex-1 w-full
    flex justify-center"
    >
      <Content>
        {address && (
          <Chart>
            <div className="">
              <div>
                <BalanceTitle>Portfolio Balance</BalanceTitle>
                <BalanceValue>{numberFormat(balance)}</BalanceValue>
              </div>
            </div>
            <BalanceChart />
          </Chart>
        )}
        {!address && (
          <div>
            <div className="text-4xl font-sans text-center tracking-wide w-100 h-100 text-blue-500 font-bold p-24">
              Connect your Wallet to see your portfolio
            </div>
          </div>
        )}
        {address && (
          <>
            <div className="mt-4 border-2 border-solid border-gray-900">
              <table className="table-auto w-full divide-y divide-gray-900">
                <thead>
                  <tr className="text-base font-semibold">
                    <th className="py-4">Name</th>
                    <th className="py-4">Balance</th>
                    <th className="py-4">Price</th>
                    <th className="py-4 mr-4 pr-2">Allocation</th>
                  </tr>
                </thead>
                <tbody className="divide-y-4 divide-gray-900">
                  {info.map((coin, index) => (
                    <>
                      <CoinRow key={index} coin={coin} bal={balance} />
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {!address && (
          <>
            <div className="mt-4 ml-4 text-white text-xl font-semibold font-mono border-[1px] border-solid border-gray-900 w-full">
              Download Metamask extension to enter the world of Crypto 🚀
              <div className="text-center mt-2">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 text-xs font-sans border-b-[1px] border-solid border-blue-700 "
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                >
                  Download Metamask Today
                </a>
                <div className="mt-4">
                  <Image
                    src="/crypto-rocket.gif"
                    width={350}
                    height={200}
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </Content>
    </div>
  );
}

const Divider = tw.div`
 m-4
`;
const Content = tw.div`
w-4/5 max-w-5xl px-4 py-8
`;
const Chart = tw.div`
border-2 border-solid border-gray-900 py-4 px-8 
`;

const BalanceTitle = tw.div`
text-gray-600 text-base 
`;

const BalanceValue = tw.div`
 text-3xl font-bold mt-2
`;
export default CoinTable;
