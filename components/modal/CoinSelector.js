import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import CoinItem from './CoinItem';

function CoinSelector({
  setAction,
  selectedToken,
  setSelectedToken,
  walletAddress,
  coins,
  from,
}) {
  return (
    <Wrapper>
      <Title>Select Asset</Title>
      <CoinList>
        {coins.map((coin) => (
          <CoinItem
            key={coin.address}
            coin={coin}
            sender={walletAddress}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            setAction={setAction}
            from={from}
          />
        ))}
      </CoinList>
    </Wrapper>
  );
}

const Wrapper = tw.div`
font-medium
`;

const Title = tw.div`
w-full text-center text-[1.5rem] mb-4 
`;

const CoinList = tw.div`
flex flex-col
`;

export default CoinSelector;
