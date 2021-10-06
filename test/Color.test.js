/* eslint-disable no-undef */

const { assert } = require("chai");

const Color = artifacts.require("./Color");

require("chai").use(require("chai-as-promised")).should();

contract("Color", (accounts) => {
  let contract;
  const COLORS = ["#545863", "#00E8FC", "#F96E46", "#F9C846"];

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
      const result = await contract.mint(COLORS[0]);
      const totalSupply = await contract.totalSupply();

      // success
      assert.equal(totalSupply, 1);
      const event = result.logs[0].args;
      assert.equal(event.tokenId.toNumber(), 0, "Id is correct");
      assert.equal(
        event.from,
        "0x0000000000000000000000000000000000000000",
        "from is correct"
      );
      assert.equal(event.to, accounts[0], "to is correct");

      // failure
      await contract.mint(COLORS[0]).should.be.rejected;
    });
  });

  describe("indexing", async () => {
    it("lists colors", async () => {
      // Mint 3 more tokens
      await contract.mint(COLORS[1]);
      await contract.mint(COLORS[2]);
      await contract.mint(COLORS[3]);

      const totalSupply = await contract.totalSupply();
      assert.equal(totalSupply, 4);

      const colors = await contract.getColors();

      assert.isArray(colors);
      assert.deepEqual(colors, COLORS);

      let color;
      let result = [];

      for (let i = 0; i < totalSupply; i++) {
        color = await contract.colors(i);
        result.push(color);
      }
      assert.deepEqual(result, COLORS);
    });
  });
});
