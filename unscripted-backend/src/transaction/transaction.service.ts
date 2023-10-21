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
    this.liquidStakingFactoryContract = new ethers.Contract(
      POLYGON_MUMBAI_LIQUID_STAKING_FACTORY_ADDRESS,
      liquidStakingFactoryAbi,
      this.provider.getSigner(),
    );
  }

  getLiquidStakingContract(contractAddres: string) {
    return new ethers.Contract(
      contractAddres,
      liquidStakingAbi,
      this.provider.getSigner(),
    );
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
    const tx = await this.liquidStakingFactoryContract.createLiquidStaking(
      writerAddress,
      scriptId,
      tokenName,
      tokenSymbol,
    );
    return tx;
  }

  async stake(contractAddres: string, amount: string) {
    this.liquidStakingContract = this.getLiquidStakingContract(contractAddres);
    const tx = await this.liquidStakingContract.stake(amount);
    return tx;
  }

  async unstake(contractAddres: string, amount: string) {
    this.liquidStakingContract = this.getLiquidStakingContract(contractAddres);
    const tx = await this.liquidStakingContract.unstake(amount);
    return tx;
  }

  async buy(contractAddres: string, amount: string) {
    this.liquidStakingContract = this.getLiquidStakingContract(contractAddres);
    const tx = await this.liquidStakingContract.buyArtifact(amount);
    return tx;
  }

  async claimRewards(contractAddres: string) {
    this.liquidStakingContract = this.getLiquidStakingContract(contractAddres);
    const tx = await this.liquidStakingContract.claimRewards();
    return tx;
  }
}
