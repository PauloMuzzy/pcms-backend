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

  async query(
    sql: string,
    values?: any[],
    tableName = 'patients', // Tabela padrão (opcional)
    filters?: { [key: string]: any },
    orderBy?: { field: string; direction: 'ASC' | 'DESC' },
  ): Promise<any> {
    let query = sql.replace(/@Table/g, tableName); // Substitui @Table pelo nome da tabela

    const queryParams = [];

    // Construir cláusula WHERE dinamicamente
    if (filters && Object.keys(filters).length > 0) {
      const filterConditions = Object.keys(filters).map((key) => {
        queryParams.push(filters[key]);
        return `${key} = ?`;
      });
      query += ` WHERE ${filterConditions.join(' AND ')}`;
    }

    // Adicionar cláusula ORDER BY dinamicamente
    if (orderBy && orderBy.field) {
      query += ` ORDER BY ${orderBy.field} ${orderBy.direction}`;
    }

    // Adicionar valores para substituição na consulta
    if (values && values.length > 0) {
      queryParams.push(...values);
    }

    const connection = await this.pool.getConnection();
    try {
      // Execute a consulta usando prepared statements
      const [rows] = await connection.execute(query, queryParams);
      return rows;
    } finally {
      connection.release();
    }
  }
}
