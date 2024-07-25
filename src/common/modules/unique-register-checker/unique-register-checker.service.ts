import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/common/modules/database/database.service';

@Injectable()
export class UniqueRegisterCheckerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async check(tableName: string, uuid: string): Promise<void> {
    const sql = `SELECT * FROM ${tableName} WHERE uuid = ?`;
    const values = [uuid];

    const result = await this.databaseService.query(sql, values);

    if (result.length === 0) {
      throw new NotFoundException('UUID not found');
    }
  }
}
