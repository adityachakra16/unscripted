import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class PolygonZKEVMProvider {
  private readonly provider;
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      process.env.ALCHEMY_POLYGON_ZKEVM_URL,
    );
  }

  getProvider() {
    return this.provider;
  }
}
