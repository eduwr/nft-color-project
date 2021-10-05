/* eslint-disable no-undef */

const Color = artifacts.require("./Color");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Color", (accounts) => {
  describe("deployment", async () => {
    it("Deploy successfully", async () => {});
  });
});
