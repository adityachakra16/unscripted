import { Injectable } from '@nestjs/common';
import { PolygonZKEVMProvider } from './polygon-zkevm.provider';
import { PolygonMumbaiProvider } from './polygon-mumbai.provider';
import { ScrollProvider } from './scroll.provider';
import { FileoinVMProvider } from './filecoin-vm.provider';

@Injectable()
export class ProvidersService {
  constructor(
    private readonly polygonZkEvmProivder: PolygonZKEVMProvider,
    private readonly polygonMumbaiProvider: PolygonMumbaiProvider,
    private readonly scrollProvider: ScrollProvider,
    private readonly fvmProvider: FileoinVMProvider,
  ) {}

  get() {
    switch (process.env.ACTIVE_NETWORK) {
      case 'polygon-zkevm':
        return this.polygonZkEvmProivder.getProvider();
      case 'polygon-mumbai':
        return this.polygonMumbaiProvider.getProvider();
      case 'scroll':
        return this.scrollProvider.getProvider();
      case 'filecoin-vm':
        return this.fvmProvider.getProvider();
      default:
        throw new Error('Invalid network');
    }
  }
}
