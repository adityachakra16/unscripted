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
      createScriptDto.askingPrice,
    );
    console.log({ tx });
    return tx;
  }

  async populateAskingPrice(id: number) {
    const askingPrice = await this.transactionService.askingPrice(
      id.toString(),
    );
    const askingPriceInEther = ethers.utils.formatUnits(askingPrice, 'ether');
    const roundedAskingPriceInEther = parseFloat(askingPriceInEther).toFixed(2);

    return roundedAskingPriceInEther;
  }

  async populateStakedAmount(id: number) {
    const stakedAmount = await this.transactionService.getStakedAmount(
      id.toString(),
    );
    const stakedInEther = ethers.utils.formatUnits(stakedAmount, 'ether');
    const roundedStakedInEther = parseFloat(stakedInEther).toFixed(2);

    return roundedStakedInEther;
  }

  async findAll(orderBy?: 'latest' | 'popular') {
    const scripts = await this.tablelandService.getScripts();
    try {
      const populatedScripts = await Promise.all(
        scripts.map(async (script) => {
          const rating = await this.populateStakedAmount(script.id);
          const askingPrice = await this.populateAskingPrice(script.id);

          return { ...script, rating, askingPrice };
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
      const askingPrice = await this.populateAskingPrice(script.id);
      console.log({ rating, askingPrice });
      return { ...script, rating, askingPrice };
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
