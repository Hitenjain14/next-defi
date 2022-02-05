import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { FaWallet } from 'react-icons/fa';
import web3 from '../../ethereum/web3';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import myToken from '../../ethereum/MyToken';

function Transfer({ selectedToken, setAction, walletAddress, setErrMessage }) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [bal, setBal] = useState('0');
  const info = useSelector(selectUser);

  useEffect(() => {
    if (info) {
      for (let inf of info) {
        if (inf.address === selectedToken.address) {
          setBal(inf.amount);
          break;
        }
      }
    }
  }, [selectedToken]);

  const sendCrypto = async () => {
    const contract = myToken(selectedToken.address);
    setAction('transferring');
    try {
      const amnt = web3.utils.toWei(amount, 'ether');
      const accounts = await web3.eth.getAccounts();
      await contract.methods.transfer(recipient, amnt).send({
        from: accounts[0],
      });
      setAction('transferred');
    } catch (err) {
      console.log(err.message);
      setErrMessage(err.message);
      setAction('error');
    }
  };

  return (
    <Wrapper>
      <Amount>
        <FlexInputContainer>
          <FlexInput
            placeholder="0"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <FlexSpan>{selectedToken.symbol}</FlexSpan>
        </FlexInputContainer>
        <Warning style={{ color: amount && '#000' }}>
          Amount is a required field
        </Warning>
      </Amount>
      <TransferForm>
        <Row>
          <FieldName>To</FieldName>
          <Icon>
            <FaWallet />
          </Icon>
          <Recipient
            placeholder="Address"
            required
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Row>
        <Divider />
        <Row>
          <FieldName>Pay With</FieldName>
          <CoinSelectList onClick={() => setAction('select')}>
            <Icon>
              <IconImg src={`/${selectedToken.logo}.png`} />
            </Icon>
            <CoinName>{selectedToken.name}</CoinName>
          </CoinSelectList>
        </Row>
      </TransferForm>
      <Row>
        <Continue
          onClick={() => {
            sendCrypto();
          }}
        >
          Continue
        </Continue>
      </Row>
      <Row>
        <BalanceTitle>{selectedToken.symbol} Balance</BalanceTitle>
        <Balance>
          {bal} {selectedToken.symbol}
        </Balance>
      </Row>
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex flex-col h-full flex-1 
`;

const Balance = tw.div`

`;

const Amount = tw.div`
flex flex-1 flex-col
`;

const TransferForm = tw.div`
border-[1px] border-solid border-gray-900 rounded-[0.4rem]
`;

const FlexInputContainer = tw.div`
flex flex-1 items-end 
`;

const FlexSpan = tw.span`
text-5xl mb-2 text-blue-500 
`;

const FlexInput = tw.input`
border-none outline-none bg-black text-xl text-right max-w-[45%] 
mr-4 text-[4.5rem] text-blue-500
`;

const Warning = tw.div`
py-4 px-8 text-center text-gray-700
`;

const Divider = tw.div`
border-b-[1px] border-solid border-gray-900
`;

const Row = tw.div`
flex items-center justify-between text-gray-700 py-4 text-xl
`;

const FieldName = tw.div`
flex-[0.5] pl-4 
`;

const Icon = tw.div`
mr-4 h-[1.8rem] w-[1.8rem] rounded-[50%] overflow-hidden grid place-items-center 
`;

const IconImg = tw.img`
h-[120%] w-[120%] object-cover 
`;

const BalanceTitle = tw.div``;

const Recipient = tw.input`
flex-[1] border-none outline-none bg-black text-white text-xl mr-2 
`;

const CoinSelectList = tw.div`
flex flex-[1.3] h-full hover:cursor-pointer
`;

const CoinName = tw.div`
flex-[1] border-none outline-none bg-black text-white text-xl mr-2 
`;

const Continue = tw.button`
text-white w-full bg-blue-600 p-4 text-center rounded-[0.4rem] text-xl 
hover:cursor-pointer hover:bg-blue-500
`;

export default Transfer;
