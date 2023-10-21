import { Injectable } from '@nestjs/common';
import { CreateScriptDto, UpdateScriptDto } from '@unscripted/shared-types';
import { TablelandService } from 'src/tableland/tableland.service';
@Injectable()
export class ScriptsService {
  constructor(private readonly tablelandService: TablelandService) {}

  async create(createScriptDto: CreateScriptDto) {
    return await this.tablelandService.createScript(
      createScriptDto.title,
      createScriptDto.content,
      createScriptDto.genres,
      createScriptDto.writer,
    );
  }

  async findAll() {
    return await this.tablelandService.getScripts();
  }

  async findOne(id: string) {
    return await this.tablelandService.getScriptById(id);
  }

  async update(id: number, updateScriptDto: UpdateScriptDto) {
    return await this.tablelandService.updateScript(
      id,
      updateScriptDto.title,
      updateScriptDto.content,
      updateScriptDto.genres,
      updateScriptDto.writer,
    );
  }
}
