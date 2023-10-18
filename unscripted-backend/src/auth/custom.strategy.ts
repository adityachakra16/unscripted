import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as jose from 'jose';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { LoginDto } from '@unscripted/shared-types';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(private readonly userRepository: UsersRepository) {
    super({});
  }

  async validate(req: Request, loginDto: LoginDto) {
    const idToken = req.headers.authorization?.split(' ')[1];
    const jwks = jose.createRemoteJWKSet(
      new URL('https://api-auth.web3auth.io/jwks'),
    );
    const jwtDecoded = (await jose.jwtVerify(idToken, jwks, {
      algorithms: ['ES256'],
    })) as any;
    const payload = jwtDecoded.payload;
    console.log({ payload, loginDto });

    if (payload.wallets[0].public_key !== loginDto.appPubKey) {
      throw new UnauthorizedException('Invalid app public key');
    }

    const user = await this.userRepository.findOne({
      ethAddress: loginDto.signedInData.eoa,
    });

    if (!user) {
      return await this.userRepository.create({
        ethAddress: loginDto.signedInData.eoa,
        email: '',
      });
    }

    return user;
  }
}
