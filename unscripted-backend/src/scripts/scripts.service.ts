import { Injectable } from '@nestjs/common';
import { CreateScriptDto, UpdateScriptDto } from '@unscripted/shared-types';
@Injectable()
export class ScriptsService {
  create(createScriptDto: CreateScriptDto) {
    return 'This action adds a new script';
  }

  findAll() {
    return `This action returns all scripts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} script`;
  }

  update(id: number, updateScriptDto: UpdateScriptDto) {
    return `This action updates a #${id} script`;
  }

  remove(id: number) {
    return `This action removes a #${id} script`;
  }
}
