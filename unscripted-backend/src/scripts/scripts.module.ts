import { Module } from '@nestjs/common';
import { ScriptsService } from './scripts.service';
import { ScriptsController } from './scripts.controller';
import { TablelandModule } from 'src/tableland/tableland.module';

@Module({
  imports: [TablelandModule],
  controllers: [ScriptsController],
  providers: [ScriptsService],
})
export class ScriptsModule {}
