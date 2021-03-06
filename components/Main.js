import React from 'react';
import tw from 'tailwind-styled-components';
import Portfolio from './Portfolio';
import CoinTable from './CoinTable';
import Promos from './Promos';
import { promoItems } from '../utils/assetPromos';

function Main({ coins }) {
  return (
    <Wrapper>
      {/* <Portfolio coins={coins} /> */}
      <CoinTable coins={coins} />
      <Promos items={promoItems} />
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex overflow-y-scroll text-white bg-black h-4/5 w-full scrollbar-hide

`;

export default Main;
