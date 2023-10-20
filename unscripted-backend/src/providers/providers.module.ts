import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { PolygonMumbaiProvider } from './polygon-mumbai.provider';
import { PolygonZKEVMProvider } from './polygon-zkevm.provider';
import { ScrollProvider } from './scroll.provider';
import { FileoinVMProvider } from './filecoin-vm.provider';

@Module({
  providers: [
    ProvidersService,
    PolygonMumbaiProvider,
    PolygonZKEVMProvider,
    ScrollProvider,
    FileoinVMProvider,
  ],
  exports: [ProvidersService],
})
export class ProvidersModule {}
