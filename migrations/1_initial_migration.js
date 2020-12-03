// eslint-disable-next-line no-undef
const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

/**
 * Access truffle console with cmd: truffle console
 * contract = await EthSwap.deployed()  // obtain the contract
 * contract.address // obtain the contract's address
 * name = await contract.name() // obtain the name variable from the contract (this is where public comes in handy on the name variable!)
 *
 */
