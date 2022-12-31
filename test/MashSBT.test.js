const { expect } = require('chai');
const { ethers } = require('hardhat');

/**
 * Mash Test code
 */
describe('MashSBT test', () => {

  // baseURI
  const baesURI = "ipfs://QmdwZBwsEKNpc9uUgUzsgiGb2uYM9X1aca9Ezgz1pR79Jo/";
  // MAX Supply
  const MAX_SUPPLY = 29;

  it('Should return the balanceOf', async () => {
    const MashSBT = await ethers.getContractFactory('MashSBT');
    const mashSBT = await MashSBT.deploy(baesURI);
    await mashSBT.deployed();

    expect(
      await mashSBT.balanceOf(
        '0x2184af4ffa9af93e99c6ac56c4507b03df8eb938'
      )
    ).to.equal(0);

  });

  /**
   * mint test 1 NFT
   */
  it('mint test', async () => {
    const MashSBT = await ethers.getContractFactory('MashSBT');
    const mashSBT = await MashSBT.deploy(baesURI);
    await mashSBT.deployed();
    // get signer address
    const [owner] = await ethers.getSigners();

    // mint 
    await mashSBT.mint(owner.address, 1, {
      value: ethers.utils.parseEther("0")
    });

    // get balance
    var balance = await mashSBT.balanceOf(owner.address);
    // check
    expect(balance).to.equal(1);
  });

  /**
   * mint test 29 NFT
   */
  it('max mint test', async () => {
    const MashSBT = await ethers.getContractFactory('MashSBT');
    const mashSBT = await MashSBT.deploy(baesURI);
    await mashSBT.deployed();
    // get signer address
    const [owner] = await ethers.getSigners();

    // mint MAX SUPPLY
    for(var i = 0;i < MAX_SUPPLY;i++) {
      await mashSBT.mint(owner.address, 1, {
        value: ethers.utils.parseEther("0")
      });
    }

    // get balance
    var balance = await mashSBT.balanceOf(owner.address);
    // check
    expect(balance).to.equal(29);
  });

  /**
   * get tokenURI
   */
  it('get tokenURI', async () => {
    const MashSBT = await ethers.getContractFactory('MashSBT');
    const mashSBT = await MashSBT.deploy(baesURI);
    await mashSBT.deployed();
    // get signer address
    const [owner] = await ethers.getSigners();

    // mint 
    await mashSBT.mint(owner.address, 1, {
      value: ethers.utils.parseEther("0")
    });

    //get tokenURI
    var tokenURI = await mashSBT.tokenURI(1);
    // check
    expect(tokenURI).to.equal("ipfs://QmdwZBwsEKNpc9uUgUzsgiGb2uYM9X1aca9Ezgz1pR79Jo/1.json");
  });
});
