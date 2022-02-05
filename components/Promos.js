import React from 'react';
import tw from 'tailwind-styled-components';

function Promos() {
  return (
    <Wrapper>
      <OfferCard>
        <Title>Invest Today</Title>
        <Description>Our coins are going to the moon!</Description>
        <Placeholder />
        <Additional>Manage your portfolio today</Additional>
      </OfferCard>
      <OfferCard>
        <Title>Launch your Own Token</Title>
        <Description>Take your coin to the moon</Description>
        <Placeholder />
        <Additional>
          Check out create your token for more information
        </Additional>
      </OfferCard>
      <OfferCard>
        <Title>Keep Patience</Title>
        <Description>Transaction Time</Description>
        <Placeholder />
        <Additional>
          Some Transactions can take upto 1-2 mins depending on the traffic,
          Don't worry every transaction will be executed
        </Additional>
      </OfferCard>
    </Wrapper>
  );
}

const Wrapper = tw.div`
mt-8 pr-4
`;

const OfferCard = tw.div`
w-80 h-44 border-2 border-solid border-gray-900 mb-4 p-5 flex flex-col cursor-default
`;

const Title = tw.div`
font-bold text-lg mb-1 
`;

const Description = tw.div`
text-base 
`;
const Placeholder = tw.div`
flex-1 
`;

const Additional = tw.div`
text-base font-bold flex items-center justify-between text-blue-500
`;

export default Promos;
