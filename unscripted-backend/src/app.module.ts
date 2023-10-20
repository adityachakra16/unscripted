import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ScriptsModule } from './scripts/scripts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { TablelandService } from './tableland/tableland.service';
import { TablelandModule } from './tableland/tableland.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypegooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    ScriptsModule,
    CommentsModule,
    AuthModule,
    TablelandModule,
    ProvidersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, TablelandService],
})
export class AppModule {}
