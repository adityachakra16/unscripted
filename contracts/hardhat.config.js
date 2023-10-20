require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// Read environment variables
const {
  PRIVATE_KEY,
  ALCHEMY_MUMBAI_URL,
  ALCHEMY_POLYGON_ZKEVM_URL,
  SCROLL_URL,
  FVM_URL,
  SCROLL_SEPOLIA_URL,
  POLYGON_ZKEVM_TESTNET_URL,
} = process.env;

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // The number of runs may vary depending on your specific contract
      },
    },
  },
  networks: {
    mumbai: {
      url: ALCHEMY_MUMBAI_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
    polygonZkEvm: {
      url: ALCHEMY_POLYGON_ZKEVM_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
    polygonZkEvmTestnet: {
      url: POLYGON_ZKEVM_TESTNET_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
    scroll: {
      url: SCROLL_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
    scrollTestnet: {
      url: SCROLL_SEPOLIA_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
    fvm: {
      url: FVM_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
};
