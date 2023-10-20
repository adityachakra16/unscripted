import { Module } from '@nestjs/common';
import { TablelandService } from './tableland.service';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  imports: [ProvidersModule],
  providers: [TablelandService],
  exports: [TablelandService],
})
export class TablelandModule {}
