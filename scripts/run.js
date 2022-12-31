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
  for (var i=0;i < 29;i++) {
    await mashSBT.mint("0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072" ,1);
  }

  console.log(`minted NFT!!`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
