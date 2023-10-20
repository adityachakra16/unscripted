import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class FileoinVMProvider {
  private readonly provider;
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.FVM_URL);
  }

  getProvider() {
    return this.provider;
  }
}
