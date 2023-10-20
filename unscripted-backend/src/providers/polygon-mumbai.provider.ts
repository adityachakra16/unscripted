import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class PolygonMumbaiProvider {
  private readonly provider;
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      process.env.ALCHEMY_MUMBAI_URL,
    );
  }

  getProvider() {
    return this.provider;
  }
}
