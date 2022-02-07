import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
// @ts-ignore
import { FaWallet } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import myToken from '../ethereum/MyToken';

// @ts-ignore
function CreateListForm({ address }) {
  const [token, setToken] = useState('');
  const [logo, setLogo] = useState();
  const [price, setPrice] = useState('');

  const notifyError = () => {
    toast.error(' Logo is missing or price is not a number', {
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

  const uploadFile = () => {
    document.getElementById('selectFile').click();
  };

  const listToken = async (e) => {
    e.preventDefault();
    var regex = /^[0-9]+$/;
    // @ts-ignore
    if (!logo || !price.match(regex)) {
      notifyError();
      return;
    }
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    try {
      const contract = myToken(token);

      if (!contract) {
        throw { message: 'invalid address' };
      }

      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();

      const form = new FormData();
      form.append('address', token);
      form.append('logo', logo[0]);
      form.append('price', price);
      form.append('name', name);
      form.append('symbol', symbol);

      const res = await axios.post('/api/upload', form, config);
      console.log(res);
    } catch (err) {
      console.log(err.message);
      notifyError();
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-1 justify-center w-full">
        <Content>
          <div className="text-3xl text-blue-500 font-bold border-[1px] border-solid border-gray-800 p-10 shadow-lg shadow-blue-500/50  ">
            List Your Token
          </div>
          <form
            onSubmit={(e) => {
              listToken(e);
            }}
            className="border-[1px] border-solid border-gray-900 px-[64px] py-10 h-full mt-2 shadow-lg shadow-blue-500/50   "
          >
            <div className="flex flex-col justify-center space-y-2 items-center ">
              <div className="relative z-0 mb-2 w-full group">
                <input
                  onFocus={(event) => {
                    event.target.setAttribute('autocomplete', 'off');
                  }}
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  name="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Token Address
                </label>
              </div>
              <div className="relative z-0  mt-[-4px] w-full group">
                <input
                  onFocus={(event) => {
                    event.target.setAttribute('autocomplete', 'off');
                  }}
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  name="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Price
                </label>
              </div>
              <div className="">
                <button
                  onClick={() => uploadFile()}
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br   shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-10  text-center mr-3 mb-2 mt-4 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-8 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Upload Logo
                </button>
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
                <input
                  type="file"
                  name="logo "
                  id="selectFile"
                  style={{ display: 'none' }}
                  // @ts-ignore
                  onChange={(e) => setLogo(e.target.files)}
                />
              </div>
              {logo && (
                <div className="text-base text-gray-300  mt-1">
                  {
                    // @ts-ignore
                    logo[0].name
                  }
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br   font-medium rounded-lg text-sm px-16 py-2.5 text-center mr-2 mb-2"
              >
                Submit
              </button>
            </div>
          </form>
        </Content>
      </div>
    </Wrapper>
  );
}

const Wrapper = tw.div`
h-full flex overflow-hidden text-white bg-black w-full scrollbar-hide
`;

// @ts-ignore
const Recipient = tw.input`
flex-[1] border-b-[1px] border-solid border-gray-400 focus:border-blue-600 outline-none bg-black text-white text-xl mr-2 block
`;

// @ts-ignore
const Row = tw.div`
flex items-center justify-center text-gray-700 py-4 text-xl space-x-2
`;

// @ts-ignore
const FieldName = tw.div`
flex-[0.5] pl-4 ml-2 mr-[-9px]
`;

// @ts-ignore
const Icon = tw.div`
mr-3 h-[1.8rem] w-[1.8rem] rounded-[50%] overflow-hidden grid place-items-center 
`;

const Content = tw.div`
w-4/5 max-w-5xl px-4 py-8 flex justify-center flex-col items-center h-full
`;

export default CreateListForm;
