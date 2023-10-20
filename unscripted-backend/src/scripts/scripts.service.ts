import { Injectable } from '@nestjs/common';
import { CreateScriptDto, UpdateScriptDto } from '@unscripted/shared-types';
import { TablelandService } from 'src/tableland/tableland.service';
@Injectable()
export class ScriptsService {
  constructor(private readonly tablelandService: TablelandService) {}

  async create(createScriptDto: CreateScriptDto) {
    return await this.tablelandService.createScript(
      createScriptDto.title,
      [],
      createScriptDto.writer,
    );
  }

  async findAll() {
    console.log('findAll');
    return await this.tablelandService.getScripts();
  }

  async findOne(id: string) {
    return await this.tablelandService.getScriptById(id);
  }

  update(id: number, updateScriptDto: UpdateScriptDto) {
    return `This action updates a #${id} script`;
  }

  remove(id: number) {
    return `This action removes a #${id} script`;
  }
}
