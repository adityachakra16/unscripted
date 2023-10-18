import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async validateUser(id: string): Promise<any> {
    const user = await this.usersRepository.findById(id);

    // if (!user) {
    //   return await this.usersRepository.create({ email });
    // }

    return user;
  }
}
