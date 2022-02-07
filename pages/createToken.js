import React from 'react';
import tw from 'tailwind-styled-components';
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks';
import Side from '../components/Side';
import Header from '../components/Header';
import MainToken from '../components/MainToken';

function CreateToken() {
  const { address } = useWeb3();
  const coins = [];
  return (
    <Wrapper>
      <div className="w-full h-full flex">
        <Side />
        <div className="w-4/5">
          <Header coins={coins} address={address} />
          <MainToken address={address} />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = tw.div`
bg-black h-screen w-screen 
`;

export default CreateToken;
