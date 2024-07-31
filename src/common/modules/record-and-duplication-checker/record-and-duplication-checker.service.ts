import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/modules/database/database.service';

interface CheckParams {
  tableName: string;
  fieldName: string;
  fieldValue: string | number;
  checkType: 'existence' | 'duplication';
}

interface ErrorDetail {
  field: string;
  message: string;
}

@Injectable()
export class RecordAndDuplicationCheckerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async checkRecords(params: CheckParams[]): Promise<void> {
    const schemaErrors: ErrorDetail[] = [];
    const duplicatedErrors: ErrorDetail[] = [];

    for (const { tableName, fieldName, fieldValue, checkType } of params) {
      const query = `SELECT * FROM ${tableName} WHERE ${fieldName} = ?;`;
      const result = await this.databaseService.query(query, [fieldValue]);

      if (checkType === 'existence' && result.length === 0) {
        schemaErrors.push({
          field: fieldName,
          message: `${fieldName} not found`,
        });
      }

      if (checkType === 'duplication' && result.length > 0) {
        duplicatedErrors.push({
          field: fieldName,
          message: `${fieldName} conflict`,
        });
      }
    }

    if (schemaErrors.length > 0 || duplicatedErrors.length > 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        details: {
          schemaErrors,
          duplicatedErrors,
        },
      });
    }
  }
}
