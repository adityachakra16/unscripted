import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class ScrollProvider {
  private readonly provider;
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      process.env.SCROLL_URL,
    );
  }

  getProvider() {
    return this.provider;
  }
}
