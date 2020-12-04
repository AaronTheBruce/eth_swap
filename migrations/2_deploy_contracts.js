// eslint-disable-next-line no-undef
const Token = artifacts.require("Token");
// eslint-disable-next-line no-undef
const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed();

  // Deploy EthSwap
  await deployer.deploy(EthSwap, token.address);
  const ethSwap = await EthSwap.deployed();

  // Xfer all tokens to EthSwap (1 mil)
  await token.transfer(ethSwap.address, '1000000000000000000000000');

};

// 38:16
