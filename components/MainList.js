import React from 'react';
import tw from 'tailwind-styled-components';
import CreateListForm from './CreateListForm';

function MainList({ address }) {
  return (
    <Wrapper>
      <CreateListForm address={address} />
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex overflow-y-scroll text-white bg-black h-4/5 w-full scrollbar-hide

`;

export default MainList;
