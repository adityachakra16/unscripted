import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { Database } from '@tableland/sdk';
import { ProvidersService } from 'src/providers/providers.service';
import { Content } from '@unscripted/shared-types';
import { Buffer } from 'buffer';
@Injectable()
export class TablelandService {
  private readonly db;
  private readonly scriptsTable = 'scripts_2_80001_8005';
  constructor(private readonly provider: ProvidersService) {
    const prov = this.provider.get();
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, prov);
    this.db = new Database({ signer });
  }

  generateId() {
    // generate id with integer format
    return Math.floor(Math.random() * 1000000000000000000).toString();
  }

  parseContent(content: string) {
    const contentBuffer = Buffer.from(content, 'base64');
    const contentString = contentBuffer.toString('utf-8');
    const parsedContent = JSON.parse(contentString);
    return parsedContent;
  }

  async getScripts() {
    const { results } = await this.db
      .prepare(`SELECT * FROM ${this.scriptsTable};`)
      .all();

    results.forEach((result) => {
      result.content = this.parseContent(result.content);
      result.createdAt = result.created_at;
    });

    return results;
  }

  async getScriptById(id: string) {
    const { results } = await this.db
      .prepare(
        `SELECT * FROM ${this.scriptsTable} where 
    id = ?
    ;`,
      )
      .bind(id)
      .all();

    const result = results[0];
    result.content = this.parseContent(results[0].content);
    result.createdAt = result.created_at;

    return result;
  }

  async createScript(
    title: string,
    content: Content[],
    genres: string[],
    writer: string,
  ) {
    const tableName = this.scriptsTable;
    const id = this.generateId();
    const contentString = JSON.stringify(content);
    const contentBuffer = Buffer.from(contentString, 'utf-8');
    console.log(typeof contentBuffer);
    const genresString = JSON.stringify(genres);
    console.log({ genresString, tableName });
    const { meta: insert } = await this.db
      .prepare(
        `INSERT INTO ${tableName} (id, title, content, genres, writer, created_at) VALUES (?, ?, ?, ?, ?, ?);`,
      )
      .bind(id, title, contentBuffer, genresString, writer, new Date())
      .run();
    console.log({ insert });
    const res = await insert.txn?.wait();
    console.log({ res });
    return id;
  }

  async updateScript(
    id: number,
    title: string,
    content: Content[],
    genres: string[],
    writer: string,
  ) {
    const tableName = this.scriptsTable;
    const contentString = JSON.stringify(content);
    const genresString = JSON.stringify(genres);
    const { meta: update } = await this.db
      .prepare(
        `UPDATE ${tableName} SET title = ?, content = ?, writer = ?, genres = ? WHERE id = ?;`,
      )
      .bind(title, contentString, writer, genresString, id)
      .run();
    console.log({ update });
    const res = await update.txn?.wait();
    console.log({ res });
    return res;
  }
}
