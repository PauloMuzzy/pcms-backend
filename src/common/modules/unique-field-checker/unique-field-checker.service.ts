import { Injectable } from '@nestjs/common';
import { ConflictException } from 'src/common/exceptions/conflict.exception';
import { DatabaseService } from 'src/common/modules/database/database.service';

interface CheckParameters {
  tableName: string;
  fields: Record<string, any>;
  uuid?: string;
}

@Injectable()
export class UniqueFieldCheckerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async check(parameters: CheckParameters): Promise<string[]> {
    const { tableName, fields, uuid } = parameters;
    const whereConditions = Object.keys(fields)
      .map((key) => `${key} = ?`)
      .join(' OR ');

    const values = Object.values(fields);

    let sql = `SELECT * FROM ${tableName} WHERE (${whereConditions})`;

    if (uuid) {
      sql += ` AND uuid != ?`;
      values.push(uuid);
    }

    const existingEntities = await this.databaseService.query(sql, values);

    const duplicatedFields = Object.keys(fields).filter((key) => {
      return existingEntities.some((entity: { [x: string]: any }) => {
        return this.isValueInEntity(entity, fields[key]);
      });
    });

    if (duplicatedFields.length > 0) {
      throw new ConflictException(duplicatedFields);
    }

    return duplicatedFields;
  }

  private isValueInEntity(entity: { [key: string]: any }, value: any): boolean {
    return Object.values(entity).some((entityValue) =>
      this.isEqual(entityValue, value),
    );
  }

  private isEqual(a: any, b: any): boolean {
    if (a.toString() === b.toString()) return true;

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      return JSON.stringify(a) === JSON.stringify(b);
    }

    if (typeof a === 'object' && typeof b === 'object') {
      return JSON.stringify(a) === JSON.stringify(b);
    }

    return false;
  }
}
