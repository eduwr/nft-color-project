/* eslint-disable no-undef */

const { assert } = require("chai");

const Color = artifacts.require("./Color");

require("chai").use(require("chai-as-promised")).should();

contract("Color", (accounts) => {
  let contract;

  before(async () => {
    contract = await Color.deployed();
  });
  describe("deployment", async () => {
    it("Deploy successfully", async () => {
      const address = contract.address;
      console.log("Contract Address: ", address);
      assert.notEqual(address, "");
      assert.notEqual(address, 0x0);
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.exists(address);
    });

    it("should has a name", async () => {
      const name = await contract.name();
      console.log("Contract Name: ", name);
      assert.exists(name);
      assert.equal(name, "Color");
    });

    it("should has a symbol", async () => {
      const symbol = await contract.symbol();
      console.log("Contract Symbol: ", symbol);
      assert.exists(symbol);
      assert.equal(symbol, "CLR");
    });
  });

  describe("minting", async () => {
    it("creates a new token", async () => {
      const result = await contract.mint("#CCCCCC");
      const totalSupply = await contract.totalSupply();
      // success

      assert.equal(totalSupply, 1);
    });
  });
});
