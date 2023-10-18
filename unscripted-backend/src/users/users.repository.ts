import { BaseRepository } from 'src/base/base.repository';
import { User } from './models/users.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(@InjectModel(User) userModel) {
    super(userModel);
  }
}
