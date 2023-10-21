import { Module } from '@nestjs/common';
import { ScriptsService } from './scripts.service';
import { ScriptsController } from './scripts.controller';
import { TablelandModule } from 'src/tableland/tableland.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [TablelandModule, TransactionModule],
  controllers: [ScriptsController],
  providers: [ScriptsService],
})
export class ScriptsModule {}
