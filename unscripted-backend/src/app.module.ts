import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ScriptsModule } from './scripts/scripts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, ScriptsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
