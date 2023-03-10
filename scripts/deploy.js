const { ethers } = require('hardhat');

async function main() {
  // baseURI
  const baesURI = "ipfs://QmdwZBwsEKNpc9uUgUzsgiGb2uYM9X1aca9Ezgz1pR79Jo/";

  const MashSBT = await ethers.getContractFactory('MashSBT');
  const mashSBT = await MashSBT.deploy(baesURI);
  // contract deploy
  await mashSBT.deployed();

  console.log(`MashSBT deployed to ${mashSBT.address}`);

  // SBT Mint
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
