import { Injectable } from '@nestjs/common';
import { CreateScriptDto, UpdateScriptDto } from '@unscripted/shared-types';
import { ethers } from 'ethers';
import { TablelandService } from 'src/tableland/tableland.service';
import { TransactionService } from 'src/transaction/transaction.service';
@Injectable()
export class ScriptsService {
  constructor(
    private readonly tablelandService: TablelandService,
    private readonly transactionService: TransactionService,
  ) {}

  async create(createScriptDto: CreateScriptDto) {
    const artifactId = await this.tablelandService.createScript(
      createScriptDto.title,
      createScriptDto.content,
      createScriptDto.genres,
      createScriptDto.writer,
    );
    const tx = await this.transactionService.createLiquidStakingContract(
      createScriptDto.writer,
      artifactId,
      createScriptDto.title,
    );
    console.log({ tx });
    return tx;
  }

  async populateStakedAmount(id: number) {
    const stakedAmount = await this.transactionService.getStakedAmount(
      id.toString(),
    );
    const bigNumberValue = ethers.BigNumber.from(stakedAmount);
    return bigNumberValue.toString();
  }

  async findAll(orderBy?: 'latest' | 'popular') {
    const scripts = await this.tablelandService.getScripts();
    try {
      const populatedScripts = await Promise.all(
        scripts.map(async (script) => {
          const rating = await this.populateStakedAmount(script.id);
          return { ...script, rating };
        }),
      );
      if (orderBy === 'latest') {
        return populatedScripts.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
      }
      if (orderBy === 'popular') {
        return populatedScripts.sort((a, b) => {
          return b.rating - a.rating;
        });
      }

      return populatedScripts;
    } catch (error) {
      console.log(error);
    }
    return scripts;
  }

  async findOne(id: string) {
    const script = await this.tablelandService.getScriptById(id);

    try {
      const rating = await this.populateStakedAmount(script.id);
      console.log({ rating });
      return { ...script, rating };
    } catch (error) {
      console.log(error);
    }
    return script;
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
