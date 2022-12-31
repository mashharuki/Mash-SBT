require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');

/** @type import('hardhat/config').HardhatUserConfig */

const {
  REACT_APP_ALCHEMY_GOERLI_URL,
  REACT_APP_ALCHEMY_MAINNET_URL,
  REACT_APP_PRIVATE_KEY,
  REACT_APP_APP_ETHERSCAN_KEY,
} = process.env;
module.exports = {
  solidity: '0.8.4',
  networks: {
    goerli: {
      url: REACT_APP_ALCHEMY_GOERLI_URL,
      accounts: [`0x${REACT_APP_PRIVATE_KEY}`],
    },
    /*
    mainnet: {
      url: REACT_APP_ALCHEMY_MAINNET_URL,
      accounts: [`0x${REACT_APP_PRIVATE_KEY}`],
    },
    */
    shibuya: {
      url: "https://shibuya.public.blastapi.io",
      chainId: 81,
      accounts: [`0x${REACT_APP_PRIVATE_KEY}`],
    },
    astar: {
      url: "https://evm.astar.network",
      chainId: 592,
      accounts: [`0x${REACT_APP_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: REACT_APP_APP_ETHERSCAN_KEY,
  },
};
