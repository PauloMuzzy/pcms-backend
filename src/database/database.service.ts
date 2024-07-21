import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { databaseConfig } from 'src/config/database/database.config';

@Injectable()
export class DatabaseService {
  private pool: mysql.Pool;

  constructor() {
    this.initializePool();
  }

  private initializePool() {
    this.pool = mysql.createPool(databaseConfig);
  }

  async query(sql: string, params?: any[]): Promise<any> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.execute(sql, params);
      return rows;
    } finally {
      connection.release();
    }
  }
}
