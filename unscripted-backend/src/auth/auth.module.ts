import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { CustomStrategy } from './custom.strategy';

@Module({
  imports: [UsersModule],
  providers: [AuthService, CustomStrategy],
  exports: [AuthService, CustomStrategy],
})
export class AuthModule {}
