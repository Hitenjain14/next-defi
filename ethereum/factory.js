import web3 from './web3';

const abi = require('./abiFactory.json');

const instance = new web3.eth.Contract(
  abi,
  '0x0982133035c4ffB9bBE1eFcbb9Ba33FB58844623'
);

export default instance;
