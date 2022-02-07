import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { BiCopy } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';

function Receive({ setAction, selectedToken, walletAddress, setFrom }) {
  const [copied, setCopied] = useState(false);

  return (
    <Wrapper>
      <Content>
        <QRContainer>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250*250&data=${walletAddress}`}
          />
        </QRContainer>
        <Divider />
        <Row>
          <CoinSelectList
            onClick={() => {
              setFrom('receive');
              setAction('select');
            }}
          >
            <Icon>
              <IconImg src={`/${selectedToken.logo}.png`} />
            </Icon>
            <CoinName>{selectedToken.name}</CoinName>
          </CoinSelectList>
        </Row>
        <Divider />
        <Row>
          <div>
            <Title>{selectedToken.symbol} Address</Title>
            <Address>{walletAddress}</Address>
          </div>
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(walletAddress);
              setCopied(true);
            }}
          >
            {copied ? <FaCheck className="text-green-500" /> : <BiCopy />}
          </CopyButton>
        </Row>
      </Content>
    </Wrapper>
  );
}

const Wrapper = tw.div`
h-full 
`;

const Content = tw.div`
border-[1px] border-solid border-gray-800 rounded-[0.5rem] flex
flex-col h-full 
`;

const QRContainer = tw.div`
flex-[1] grid place-items-center
`;

const Divider = tw.div`
border-b-[1px] border-solid border-gray-800 
`;

const Row = tw.div`
flex w-full p-4 items-center justify-between text-gray-700 text-xl 
`;

const Icon = tw.div`
mr-4 h-[1.8rem] w-[1.8rem] rounded-[50%] overflow-hidden grid place-items-center 
`;

const IconImg = tw.img`
h-[120%] w-[120%] object-cover 
`;

const CoinSelectList = tw.div`
flex flex-[1.3] h-full hover:cursor-pointer
`;

const CoinName = tw.div`
flex-1 border-none outline-none text-white text-xl mr-2 
`;

const Title = tw.div`
text-white mb-2 
`;

const Address = tw.div`
text-[0.8rem]
`;

const CopyButton = tw.div`
cursor-pointer
`;

export default Receive;
