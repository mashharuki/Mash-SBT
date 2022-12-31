const { ethers } = require('hardhat');

async function main() {
  const MashSBT = await ethers.getContractFactory('MashSBT');
  const mashSBT = await MashSBT.deploy();
  // contract deploy
  await mashSBT.deployed();

  console.log(`CooperatorNFT deployed to ${mashSBT.address}`);

  // SBT Mintec
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
