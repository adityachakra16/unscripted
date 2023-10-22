const hre = require("hardhat");

async function main() {
  // Deploy DemoToken contract with an initial supply of 10000 tokens
  const DemoToken = await hre.ethers.getContractFactory("DemoToken");
  const initialSupply = hre.ethers.utils.parseEther("10000");
  const demoToken = await DemoToken.deploy(initialSupply);
  await demoToken.deployed();

  console.log("DemoToken deployed to:", demoToken.address);

  // Deploy LiquidStakingFactory contract
  const LiquidStakingFactory = await hre.ethers.getContractFactory(
    "LiquidStakingFactory"
  );

  // For using ApeCoin, remove demotoken.address and replace with ApeCoin address - 0x328507DC29C95c170B56a1b3A758eB7a9E73455c on Goerlu, 0x4d224452801ACEd8B2F0aebE155379bb5D594381 on Mainnet

  const liquidStakingFactory = await LiquidStakingFactory.deploy(
    demoToken.address
  );
  await liquidStakingFactory.deployed();

  console.log(
    "LiquidStakingFactory deployed to:",
    liquidStakingFactory.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
