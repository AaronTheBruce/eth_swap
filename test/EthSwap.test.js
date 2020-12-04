const { assert } = require('chai');
const { default: Web3 } = require('web3');

/* eslint-disable no-undef */
const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n){ // converts tokens into their 'Cents' equivalent. Allows us to control visually numbers of tokens
  return web3.utils.toWei(n, "ether");
}

contract('EthSwap', ([deployer, investor]) => {
  let token, ethSwap;

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
    await token.transfer(ethSwap.address, tokens('1000000'))
  })

  describe('Token deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name();
      assert.equal(name, 'DApp Token')
    })
  })

  describe('EthSwap deployment', async () => {
    it('contract has a name', async () => {
      const name = await ethSwap.name();
      assert.equal(name, 'EthSwap Instant Exchange')
    })
  })

  it('contract has tokens', async () => {
    let balance = await token.balanceOf(ethSwap.address)
    assert.equal(balance.toString(), tokens('1000000'))
  })

  describe('buy tokens', async () => {
    let result;
    before(async() => {
      result = await ethSwap.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether')});
    })
    it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async () => {
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens('100'));
      // Check ethSwap balance after purchase
      let ethSwapBalance;
      ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), tokens('999900'));
      ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), tokens('1'));

      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens('100').toString());
      assert.equal(event.rate.toString(), '100');
    })
  })

})
