import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import axios from 'axios';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Buy({ selectedToken, setAction, walletAddress, setFrom }) {
  const [amount, setAmount] = useState('');
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);

  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    // const data = await fetch('http://localhost:3000/api/razorpay', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     tokens: amount,
    //     walletAddress: walletAddress,
    //     address: selectedToken.address,
    //   }),
    // }).then((t) => t.json());

    try {
      const opt = {
        tokens: amount,
        walletAddress: walletAddress,
        address: selectedToken.address,
      };
      const data = await axios.post('/api/razorpay', opt);
      console.log(data.data);
      if (data.status !== 200) {
        return;
      }
      const options = {
        key: 'rzp_test_8axYuImu2N6K4d',
        currency: data.data.currency,
        amount: data.data.amount.toString(),
        order_id: data.data.id,
        name: 'Buying Token',
        description: 'Payment order for token',
        callback_url: '/',
        notes: data.data.notes,
        handler: function (response) {},
      };
      //@ts-ignore
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err);
    }
  }

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
          <FieldName>Token</FieldName>
          <CoinSelectList
            onClick={() => {
              setFrom('buy');
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
          <FieldName>Pay With</FieldName>
          <div className="flex flex-[1.3] h-full ">
            <div className="mr-4 overflow-hidden w-[2.8rem] h-[2rem]">
              <IconImg className="object-contain" src="/razorpay-logo.png" />
            </div>
            <CoinName>Razorpay</CoinName>
          </div>
        </Row>
      </TransferForm>
      <Row>
        <Continue onClick={displayRazorpay}>Continue</Continue>
      </Row>
      <Row>
        <BalanceTitle>Amount Payable</BalanceTitle>
        <Balance>
          {numberFormat(
            // @ts-ignore
            amount * selectedToken.price
          )}
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

export default Buy;
