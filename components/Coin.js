import React from 'react';
import tw from 'tailwind-styled-components';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Image from 'next/image';

function Coin({ coin }) {
  const img = `/${coin.logo}.png`;
  return (
    <Wrapper>
      <WrapperDiv>
        <div className="flex-auto">
          <NameCol>
            <CoinIcon>
              <Image
                src={img}
                alt={coin.name}
                width={100}
                height={100}
                objectFit="contain"
              />
            </CoinIcon>
            <div className="">
              <Primary>{coin.name}</Primary>
              <Secondary>{coin.symbol}</Secondary>
            </div>
          </NameCol>
        </div>
        <div className="ml-2">
          <Primary>
            {'₹'}
            {coin.price}
          </Primary>
          <Secondary>{coin.symbol}</Secondary>
        </div>
        <div className="ml-2 mt-2">
          <Primary>
            {'₹'}
            {coin.price}
          </Primary>
          <div
            className={
              coin.change < 0
                ? 'text-red-500 text-lg'
                : 'text-emerald-500 text-lg'
            }
          >
            {coin.change > 0 && '+'}
            {coin.change}
          </div>
        </div>
      </WrapperDiv>
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex w-full justify-between items-center
`;

const WrapperDiv = tw.div`
w-full flex justify-between items-center
py-4 px-8 space-x-4
`;

const NameCol = tw.div`
flex items-center
`;

const CoinIcon = tw.div`
w-12 mr-4 mt-2
`;

const Primary = tw.div`
mb-0.5 font-semibold text-lg
`;

const Secondary = tw.div`
text-sm text-gray-500 font-semibold
`;

export default Coin;
