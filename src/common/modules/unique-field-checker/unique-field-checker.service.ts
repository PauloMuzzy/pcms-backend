import { Injectable } from '@nestjs/common';
import { ConflictException } from 'src/common/exceptions/conflict.exception';
import { DatabaseService } from 'src/common/modules/database/database.service';

@Injectable()
export class UniqueFieldCheckerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async check(tableName: string, fields: Record<string, any>): Promise<void> {
    const whereConditions = Object.keys(fields)
      .map((key) => `${key} = ?`)
      .join(' OR ');
    const values = Object.values(fields);
    const sql = `SELECT * FROM ${tableName} WHERE ${whereConditions}`;

    const existingEntities = await this.databaseService.query(sql, values);

    const duplicatedFields = Object.keys(fields).filter((key) =>
      existingEntities.some(
        (entity: { [x: string]: any }) => entity[key] === fields[key],
      ),
    );

    if (duplicatedFields.length > 0) {
      throw new ConflictException(duplicatedFields);
    }
  }
}
