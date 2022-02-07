import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import Transfer from './Transfer';
import CoinSelector from './CoinSelector';
import Receive from './Receive';

function TransferModal({ coins, address }) {
  const [active, setActive] = useState('send');
  const [selectedToken, setSelectedToken] = useState(coins[0]);
  const [errMessage, setErrMessage] = useState('');
  const [from, setFrom] = useState('send');

  const selectedStyle = {
    color: '#3773f5',
  };

  const unselectedStyle = {
    border: '1px solid #282b2f',
  };

  const selectedModal = (option) => {
    switch (option) {
      case 'send':
        return (
          <Transfer
            selectedToken={selectedToken}
            setAction={setActive}
            walletAddress={address}
            setErrMessage={setErrMessage}
            setFrom={setFrom}
          />
        );
      case 'receive':
        return (
          <Receive
            setAction={setActive}
            walletAddress={address}
            selectedToken={selectedToken}
            setFrom={setFrom}
          />
        );

      case 'select':
        return (
          <CoinSelector
            setAction={setActive}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            walletAddress={address}
            coins={coins}
            from={from}
          />
        );
      case 'transferring':
        return (
          <div className="text-center">
            <h2 className="text-xl text-semibold ">Transferring..</h2>
            <svg
              role="status"
              className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        );
      case 'transferred':
        return (
          <div className="text-center flex items-center justify-center">
            <h2 className="text-green-500 text-xl text-semibold">
              Transferred
            </h2>
          </div>
        );
      case 'error':
        return (
          <div className="text-center flex items-center justify-center">
            <h2 className="text-red-400 text-xl ">
              Error, given inputs are invalid or the transaction was denied
            </h2>
          </div>
        );
      default:
        return <h2>send</h2>;
    }
  };

  return (
    <Wrapper>
      <Selector>
        <Option
          style={active === 'send' ? selectedStyle : unselectedStyle}
          onClick={() => setActive('send')}
        >
          <p>Send</p>
        </Option>
        <Option
          style={active === 'receive' ? selectedStyle : unselectedStyle}
          onClick={() => setActive('receive')}
        >
          <p>Receive</p>
        </Option>
      </Selector>
      <ModalMain>{selectedModal(active)}</ModalMain>
    </Wrapper>
  );
}

const Wrapper = tw.div`
 h-[35rem] w-[27rem] text-white border-[1px] border-solid border-gray-900 flex flex-col

`;

const Selector = tw.div`
flex justify-evenly items-center h-20
`;

const Option = tw.div`
h-full w-full grid place-items-center text-xl font-semibold hover:cursor-pointer
hover:bg-gray-900 min-w-[215px] min-h-[80px]
`;

const ModalMain = tw.div`
p-4 flex-1  overflow-y-scroll scrollbar-hide
`;

export default TransferModal;
