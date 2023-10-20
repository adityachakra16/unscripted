import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { Database } from '@tableland/sdk';
import { ProvidersService } from 'src/providers/providers.service';

@Injectable()
export class TablelandService {
  private readonly db;
  private readonly scriptsTable = 'scripts_80001_7886';
  constructor(private readonly provider: ProvidersService) {
    const prov = this.provider.get();
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, prov);
    this.db = new Database({ signer });
  }

  generateId() {
    // generate id with integer format
    return Math.floor(Math.random() * 1000000000000000000).toString();
  }

  async getScripts() {
    const { results } = await this.db
      .prepare(`SELECT * FROM ${this.scriptsTable};`)
      .all();

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
    return results;
  }

  async createScript(
    title: string,
    content: {
      character: string;
      dialogue: string;
    }[],
    writer: string,
  ) {
    const tableName = this.scriptsTable;
    const id = this.generateId();

    const { meta: insert } = await this.db
      .prepare(`INSERT INTO ${tableName} (id, title, writer) VALUES (?, ?, ?);`)
      .bind(id, title, writer)
      .run();
    console.log({ insert });
    const res = await insert.txn?.wait();
    console.log({ res });
    return res;
  }

  async updateScript(
    id: string,
    title: string,
    content: {
      character: string;
      dialogue: string;
    }[],
    writer: string,
  ) {
    const tableName = this.scriptsTable;
    const { meta: update } = await this.db
      .prepare(
        `UPDATE ${tableName} SET title = ?, content = ?, writer = ? WHERE id = ?;`,
      )
      .bind(title, content, writer, id)
      .run();
    console.log({ update });
    const res = await update.txn?.wait();
    console.log({ res });
    return res;
  }
}
