import { Injectable } from '@nestjs/common';
import {
  POLYGON_MUMBAI_LIQUID_STAKING_FACTORY_ADDRESS,
  liquidStakingAbi,
  liquidStakingFactoryAbi,
} from '@unscripted/shared-types';
import { ethers } from 'ethers';

@Injectable()
export class TransactionService {
  private readonly liquidStakingFactoryContract;
  private liquidStakingContract;
  private readonly provider;
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      process.env.ALCHEMY_MUMBAI_URL,
    );
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);

    this.liquidStakingFactoryContract = new ethers.Contract(
      POLYGON_MUMBAI_LIQUID_STAKING_FACTORY_ADDRESS,
      liquidStakingFactoryAbi,
      signer,
    );
  }

  async getLiquidStakingContract(scriptId: string) {
    console.log({ scriptId });
    const contractAddres =
      await this.liquidStakingFactoryContract.artifactIdToStaking(
        scriptId.toString(),
      );
    console.log({ contractAddres });
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);

    return new ethers.Contract(contractAddres, liquidStakingAbi, signer);
  }

  async createLiquidStakingContract(
    writerAddress: string,
    scriptId: string,
    scriptTitle: string,
  ) {
    const tokenName = scriptTitle
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), '');
    const tokenSymbol = tokenName.toUpperCase().slice(0, 3);

    console.log({
      lfs: this.liquidStakingFactoryContract,
    });
    const tx = await this.liquidStakingFactoryContract.createLiquidStaking(
      writerAddress,
      scriptId,
      tokenName,
      tokenSymbol,
    );
    return tx;
  }

  async stake(scriptId: string, amount: string) {
    this.liquidStakingContract = await this.getLiquidStakingContract(scriptId);
    const tx = await this.liquidStakingContract.stake(amount);
    return tx;
  }

  async unstake(scriptId: string, amount: string) {
    this.liquidStakingContract = await this.getLiquidStakingContract(scriptId);
    const tx = await this.liquidStakingContract.unstake(amount);
    return tx;
  }

  async buy(scriptId: string, amount: string) {
    this.liquidStakingContract = await this.getLiquidStakingContract(scriptId);
    const tx = await this.liquidStakingContract.buyArtifact(amount);
    return tx;
  }

  async claimRewards(scriptId: string) {
    this.liquidStakingContract = await this.getLiquidStakingContract(scriptId);
    const tx = await this.liquidStakingContract.claimRewards();
    return tx;
  }

  async getStakedAmount(scriptId: string) {
    console.log('qwert');
    this.liquidStakingContract = await this.getLiquidStakingContract(scriptId);
    try {
      const stakedAmount = await this.liquidStakingContract.totalStaked();
      console.log({ stakedAmount });

      return stakedAmount;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  async getRewards(scriptId: string, userAddress: string) {
    this.liquidStakingContract = await this.getLiquidStakingContract(scriptId);
    const totalRewardPool = await this.liquidStakingContract.totalRewardPool();
    const userStake = await this.liquidStakingContract.stakes(userAddress);
    const totalStaked = await this.liquidStakingContract.totalStaked();
    return userStake.mul(totalRewardPool).div(totalStaked);
  }
}
