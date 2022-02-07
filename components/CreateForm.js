import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import { BiCopy } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';

function CreateForm({ address }) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [amount, setAmount] = useState('');
  const [pro, setPro] = useState(false);
  const [tokenAddress, setTokenAddress] = useState('');
  const [copied, setCopied] = useState(false);

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
  const notifyError = () => {
    toast.error('Error input fields are wrong', {
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

  const createToken = async (e) => {
    e.preventDefault();
    if (!address) {
      notify();
      setName('');
      setSymbol('');
      setAmount('');
      return;
    }
    try {
      setPro(true);
      const sym = symbol.toUpperCase();
      await factory.methods.createToken(name, sym, amount).send({
        from: address,
      });
      const addr = await factory.methods.getToken().call({
        from: address,
      });
      setTokenAddress(addr);
    } catch (err) {
      notifyError();
    }
    setPro(false);
    setName('');
    setSymbol('');
    setAmount('');
  };

  return (
    <Wrapper>
      <div
        className="flex-1 w-full
    flex justify-center"
      >
        <Content>
          <div className="text-blue-500 mt-6 py-10 px-9 text-3xl font-bold border-[1px] border-solid border-gray-900">
            Token Creation
          </div>
          <form
            onSubmit={(e) => {
              createToken(e);
            }}
            className="border-[1px] border-solid border-gray-900 px-[62px] py-10 h-full"
          >
            <div className="flex flex-col justify-center">
              <div className="relative z-0 mb-6 w-full group">
                <input
                  onFocus={(event) => {
                    event.target.setAttribute('autocomplete', 'off');
                  }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  onFocus={(event) => {
                    event.target.setAttribute('autocomplete', 'off');
                  }}
                  autoComplete="false"
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  name="floating_password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Symbol
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  onFocus={(event) => {
                    event.target.setAttribute('autocomplete', 'off');
                  }}
                  type="number"
                  name="repeat_password"
                  value={amount}
                  // @ts-ignore
                  onChange={(e) => setAmount(e.target.value)}
                  id="floating_repeat_password"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_repeat_password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Amount of Tokens
                </label>
              </div>
              {!pro && (
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              )}
              {pro && (
                <button
                  disabled
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                >
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </button>
              )}
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
            </div>
          </form>
          {tokenAddress && (
            <>
              <div className="text-xl text-blue-500 font-semibold p-4 ">
                Address of your token is -
                <div className="flex justify-center space-x-2 items-center">
                  <div className="text-base text-semibold text-gray-500">
                    {tokenAddress.slice(0, 7)}...{tokenAddress.slice(35)}
                  </div>
                  <CopyButton
                    onClick={() => {
                      navigator.clipboard.writeText(tokenAddress);
                      setCopied(true);
                      setTimeout(function () {
                        setCopied(false);
                      }, 3000);
                    }}
                  >
                    {copied ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <BiCopy />
                    )}
                  </CopyButton>
                </div>
              </div>
            </>
          )}
        </Content>
      </div>
    </Wrapper>
  );
}

const Wrapper = tw.div`
h-full flex overflow-hidden text-white bg-black w-full scrollbar-hide
`;

const CopyButton = tw.div`
cursor-pointer
`;

const Content = tw.div`
w-4/5 max-w-5xl px-4 py-8 flex justify-center flex-col items-center h-full
`;

export default CreateForm;
