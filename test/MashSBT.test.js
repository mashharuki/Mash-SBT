const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MashSBT test', () => {
  it('Should return the balanceOf', async () => {
    const MashSBT = await ethers.getContractFactory('MashSBT');
    const mashSBT = await MashSBT.deploy();
    await mashSBT.deployed();

    expect(
      await mashSBT.balanceOf(
        '0x2184af4ffa9af93e99c6ac56c4507b03df8eb938'
      )
    ).to.equal(0);

  });
});
