require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

// Read environment variables
const {
  PRIVATE_KEY,
  ALCHEMY_MUMBAI_URL,
  ALCHEMY_POLYGON_ZKEVM_URL,
  SCROLL_URL,
  FVM_URL,
  SCROLL_SEPOLIA_URL,
  POLYGON_ZKEVM_TESTNET_URL,
  GOERLI_URL,
  FVM_CALIBRATION_URL,
} = process.env;

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // The number of runs may vary depending on your specific contract
      },
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: "abc",
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://sepolia-blockscout.scroll.io/api",
          browserURL: "https://sepolia-blockscout.scroll.io/",
        },
      },
    ],
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
    fvmCalibration: {
      url: FVM_CALIBRATION_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
    goerli: {
      url: GOERLI_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
};
