pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
  // public allows us to have a function callName to access this value outside this smart contract
  string public name = "EthSwap Instant Exchange"; // state var
  Token public token; // state var
  uint public rate = 100;
  
  event TokenPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(Token _token) public {
    token = _token; // assigns _token to global state var
  }

  // msg is a global variable, sender is the address of the caller
  function buyTokens() public payable { // payable allows the sending of crypto
    // Calculate the number of tokens to buy
    uint tokenAmount = msg.value * rate;
    token.transfer(msg.sender, tokenAmount);

    // Emit an event that tokens were purchased
    emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
  }
}
