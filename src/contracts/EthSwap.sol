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

  event TokensSold(
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

    // require is a boolean check to verify a true statement to continue with rest of block
    require(token.balanceOf(address(this)) >= tokenAmount); // EthSwap's balance must be greater than or equal to the requested amount

    // Trasnfer tokens to the user
    token.transfer(msg.sender, tokenAmount);

    // Emit an event that tokens were purchased
    emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
  }

  function sellTokens(uint _amount) public {
    // User cannot sell more tokens than they have
    require(token.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / rate;

    // Require that EthSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform Sale
    token.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    // Emit and Event
    emit TokensSold(msg.sender, address(token), _amount, rate);
  }
}
