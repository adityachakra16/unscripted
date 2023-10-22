const hre = require("hardhat");

async function main() {
  // Deploy DemoToken contract with an initial supply of 10000 tokens
  let tokenAddress;
  if (process.env.TOKEN_TO_USE === "apecoin") {
    tokenAddress = "0x328507DC29C95c170B56a1b3A758eB7a9E73455c";
  } else {
    const DemoToken = await hre.ethers.getContractFactory("DemoToken");
    const initialSupply = hre.ethers.utils.parseEther("10000");
    const demoToken = await DemoToken.deploy(initialSupply);
    await demoToken.deployed();

    console.log("DemoToken deployed to:", demoToken.address);
    tokenAddress = demoToken.address;
  }

  // Deploy LiquidStakingFactory contract
  const LiquidStakingFactory = await hre.ethers.getContractFactory(
    "LiquidStakingFactory"
  );

  const liquidStakingFactory = await LiquidStakingFactory.deploy(tokenAddress);
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
