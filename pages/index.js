import Head from 'next/head';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import tw from 'tailwind-styled-components';
import Main from '../components/Main';
import dbConnect from '../utils/dbConnect';
import Coin from '../models/Coins';
import Side from '../components/Side';
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks';

export default function Home({ coins }) {
  const { address, chainId, connectWallet, disconnectWallet } = useWeb3();
  const [wallet, setWallet] = useState('');
  const [balance, setBalance] = useState(0);

  return (
    <Wrapper>
      <div className="w-full h-full flex">
        <Side />
        <div className="w-4/5">
          <Header coins={coins} address={address} />
          <Main coins={coins} />
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = tw.div`
bg-black h-screen w-screen 
`;

export async function getServerSideProps(context) {
  await dbConnect();

  const result = await Coin.find();
  const coins = result.map((doc) => {
    const pet = doc.toObject();
    pet._id = pet._id.toString();
    pet.time = pet.time.getTime();
    pet.name = pet.name.charAt(0).toUpperCase() + pet.name.slice(1);
    const rand = (Math.random() * 40 - 20).toPrecision(2);
    pet.change = rand;
    return pet;
  });
  return {
    props: { coins: coins },
  };
}
