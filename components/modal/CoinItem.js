import React from 'react';
import tw from 'tailwind-styled-components';
import { FaCheck } from 'react-icons/fa';

function CoinItem({
  coin,
  sender,
  selectedToken,
  setSelectedToken,
  setAction,
  from,
}) {
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  return (
    <Wrapper
      style={{ backgroundColor: selectedToken.name === coin.name && '#141519' }}
      onClick={() => {
        setSelectedToken(coin);
        setAction(from);
      }}
    >
      <Main>
        <Icon>
          <IconImg src={`/${coin.logo}.png`} />
        </Icon>
        <NameDetails>
          <Name>{coin.name}</Name>
          <Symbol>{coin.symbol}</Symbol>
        </NameDetails>
      </Main>
      <Balance>{numberFormat(coin.price)} / coin</Balance>
      <IsSelected>
        {selectedToken.address === coin.address && <FaCheck />}
      </IsSelected>
    </Wrapper>
  );
}

const Main = tw.div`
flex-[1] flex items-center
`;

const Wrapper = tw.div`
flex items-center py-4 px-2 rounded-[0.5rem] mb-[0.3rem]
hover:bg-gray-900 
`;

const Icon = tw.div`
mr-4 h-[2.4rem] w-[2.4rem] rounded-[50%] overflow-hidden grid place-items-center 
`;

const IconImg = tw.img`
h-[120%] w-[120%] object-cover 
`;

const NameDetails = tw.div`

`;

const Balance = tw.div``;

const Name = tw.div`
text-lg mb-1   
`;

const Symbol = tw.div`
ml-2 text-gray-800 
`;

const IsSelected = tw.div`
ml-2 text-blue-500
`;

export default CoinItem;
