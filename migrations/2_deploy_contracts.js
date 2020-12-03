// eslint-disable-next-line no-undef
const EthSwap = artifacts.require("EthSwap");

module.exports = function(deployer) {
  deployer.deploy(EthSwap);
};
