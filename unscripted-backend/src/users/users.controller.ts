import { Controller, Get, Param } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get()
  findAll() {
    return this.usersRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersRepository.findById(id);
  }
}
