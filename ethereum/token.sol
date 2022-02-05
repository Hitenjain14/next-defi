
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';


contract TokenFactory{
    mapping(address => address) public tokens;
    function createToken(string memory _name,string memory _symbol) public {
        MyToken token = new MyToken(_name,_symbol,msg.sender);
        tokens[msg.sender] = address(token);
    }

    function getToken() public view returns(address){
        return tokens[msg.sender];
    }

}



contract MyToken is ERC20{

    address immutable admin;

    constructor(string memory _name,string memory _symbol,address _owner)ERC20(_name,_symbol){
         _mint(_owner, 100000*10**18);
         admin = _owner;
    }

    function mint(address to,uint amount) public {
            require(msg.sender == admin,"only admin is allow");
            _mint(to,amount);
    }

}