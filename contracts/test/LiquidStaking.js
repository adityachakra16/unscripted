const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("LiquidStaking", function () {
  let liquidStaking, stakingToken, rewardToken, owner, addr1, addr2;

  beforeEach(async function () {
    const [deployer, _addr1, _addr2] = await ethers.getSigners();
    owner = deployer;
    addr1 = _addr1;
    addr2 = _addr2;

    const ERC20 = await ethers.getContractFactory("DemoToken");
    stakingToken = await ERC20.deploy("10000");
    await stakingToken.deployed();

    const StakingToken = await ethers.getContractFactory("StakingToken");
    rewardToken = await StakingToken.deploy("Reward Token", "RWD");
    await rewardToken.deployed();

    const LiquidStaking = await ethers.getContractFactory("LiquidStaking");
    liquidStaking = await LiquidStaking.deploy(
      stakingToken.address,
      rewardToken.address,
      owner.address,
      1
    );
    await liquidStaking.deployed();
  });

  it("Should properly initialize contract", async function () {
    expect(await liquidStaking.stakingToken()).to.equal(stakingToken.address);
    expect(await liquidStaking.rewardToken()).to.equal(rewardToken.address);
    expect(await liquidStaking.artifactCreator()).to.equal(owner.address);
    expect(await liquidStaking.artifactId()).to.equal(1);
  });

  it("Should allow users to stake tokens", async function () {
    await stakingToken.approve(liquidStaking.address, 100);
    await liquidStaking.stake(100);

    expect(await liquidStaking.totalStaked()).to.equal(100);
    expect(await liquidStaking.stakes(owner.address)).to.equal(100);
  });

  // Add more tests for unstaking, buying artifacts, and claiming rewards.
});
