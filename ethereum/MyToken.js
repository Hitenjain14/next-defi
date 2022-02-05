import abi from './abiToken.json';
import web3 from './web3';

const myToken = (address) => {
  return new web3.eth.Contract(abi, address);
};

export default myToken;
