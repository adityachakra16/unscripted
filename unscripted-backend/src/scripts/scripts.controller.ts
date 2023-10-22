import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ScriptsService } from './scripts.service';
import { CreateScriptDto, UpdateScriptDto } from '@unscripted/shared-types';

@Controller('scripts')
export class ScriptsController {
  constructor(private readonly scriptsService: ScriptsService) {}

  @Post()
  create(@Body() createScriptDto: CreateScriptDto) {
    return this.scriptsService.create(createScriptDto);
  }

  @Get()
  findAll(@Query('orderBy') orderBy: 'latest' | 'popular') {
    console.log({ orderBy });
    return this.scriptsService.findAll(orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scriptsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScriptDto: UpdateScriptDto) {
    return this.scriptsService.update(+id, updateScriptDto);
  }
}
