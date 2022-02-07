import React from 'react';
import tw from 'tailwind-styled-components';
import CreateForm from './CreateForm';
import Promos from './Promos';
import { createItems } from '../utils/assetPromos';

function MainToken({ address }) {
  return (
    <Wrapper>
      <CreateForm address={address} />
      <Promos items={createItems} />
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex overflow-y-scroll text-white bg-black h-4/5 w-full scrollbar-hide

`;

export default MainToken;
