import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tw from 'tailwind-styled-components';
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks';
import myToken from '../ethereum/MyToken';
import web3 from '../ethereum/web3';
import { useDispatch, useSelector } from 'react-redux';
import { addInfo, deleteInfo } from '../slices/userSlice';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import TransferModal from './modal/TransferModal';
import Link from 'next/link';
import BuyModal from './modal/BuyModal';

Modal.setAppElement('#__next');

function Header({ coins, address }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { chainId, connectWallet, disconnectWallet } = useWeb3();
  const [wallet, setWallet] = useState('');
  const [balance, setBalance] = useState(0);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#0a0b0d',
      padding: 0,
      border: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(10,11,13,0.75)',
    },
  };

  const connect = () => {
    connectWallet('injected');

    if (address) {
      setWallet(address);
    }
  };

  useEffect(() => {
    async function getInfo() {
      let bal = 0;
      await Promise.all(
        coins.map(async (coin) => {
          let info = {};
          const contract = myToken(coin.address);
          const address = await web3.eth.getAccounts();
          if (address[0]) {
            dispatch(deleteInfo());
            let val = await contract.methods.balanceOf(address[0]).call();
            val = web3.utils.fromWei(val, 'ether');
            val = Number(val);
            // val = val = val * coin.price;
            bal = bal + val;
            if (val > 0) {
              info.address = coin.address;
              info.price = coin.price;
              info.amount = val;
              info.balance = coin.price * val;
              info.name = coin.name;
              info.logo = coin.logo;
              info.symbol = coin.symbol;
              info.change = (Math.random() * 40 - 20).toPrecision(2);
              dispatch(addInfo(info));
            }
          }
        })
      );
      setBalance(bal);
    }
    getInfo();
  }, [wallet]);

  const notify = () => {
    toast.info('Please connect your wallet first', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  return (
    <Wrapper>
      <Title>Dashboard</Title>
      <ButtonContainer>
        {address ? (
          <WalletLink>
            <WalletLinkTitle>Wallet Connected</WalletLinkTitle>
            <WalletAddress>
              {address.slice(0, 7)}...{address.slice(35)}
            </WalletAddress>
          </WalletLink>
        ) : (
          <div
            onClick={() => {
              connect();
            }}
            className="bg-black text-white border-2 border-solid border-gray-800 p-5 font-bold rounded-md mr-4 hover:cursor-pointer shadow-lg text-lg "
          >
            Connect
          </div>
        )}
        {address && (
          <Link href={'/?buyWind=1'}>
            <Button>Buy/Sell</Button>
          </Link>
        )}
        {!address && <Button onClick={notify}>Buy/Sell</Button>}
        {address && (
          <Link href={'/?transfer=1'}>
            <div className="bg-black text-white border-2 border-solid border-gray-800 p-5 font-bold rounded-md mr-4 hover:cursor-pointer shadow-lg text-lg ">
              Send/Receive
            </div>
          </Link>
        )}
        {!address && (
          <>
            <div
              onClick={notify}
              className="bg-black text-white border-2 border-solid border-gray-800 p-5 font-bold rounded-md mr-4 hover:cursor-pointer shadow-lg text-lg "
            >
              Send/Receive
            </div>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              transition={Flip}
            />
          </>
        )}
      </ButtonContainer>
      <Modal
        isOpen={!!router.query.transfer}
        onRequestClose={() => router.push('/')}
        style={customStyles}
      >
        <TransferModal coins={coins} address={address} />
      </Modal>
      <Modal
        isOpen={!!router.query.buyWind}
        onRequestClose={() => router.push('/')}
        style={customStyles}
      >
        <BuyModal coins={coins} address={address} />
      </Modal>
    </Wrapper>
  );
}

const Wrapper = tw.div`
 px-4 py-6 border-b-2 border-solid border-gray-700 flex items-center bg-black 
 w-full
`;

const Title = tw.div`
    text-3xl font-semibold flex-1 text-white
`;

const Button = tw.div`
    border-2 border-solid border-gray-800 p-5 font-bold
     rounded-md mr-4 hover:cursor-pointer text-black bg-blue-600 text-lg
     shadow-lg
`;

const ButtonContainer = tw.div`
flex
`;

const WalletLinkTitle = tw.div`
text-lg mb-1 text-emerald-500
`;

const WalletAddress = tw.div`
text-base text-white 
`;

const WalletLink = tw.div`
text-base  rounded-[50rem] mr-8
 flex flex-col items-start justify-center hover:cursor-default
`;

export default Header;
