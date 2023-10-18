import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@unscripted/shared-types';
import { CustomStrategy } from './custom.strategy';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly strategy: CustomStrategy,
  ) {}

  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res,
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ) {
    await this.strategy.validate(req, loginDto);
  }
}
