import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/modules/database/database.service';

interface CheckParams {
  tableName: string;
  fieldName: string;
  fieldValue: string | number | undefined;
  checkType: 'existence' | 'duplication';
  fieldNameResponse: string;
}

interface ErrorDetail {
  field: string;
  message: string;
}

@Injectable()
export class RecordAndDuplicationCheckerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async checkRecords(params: CheckParams[]): Promise<void> {
    const notFoundErrors: ErrorDetail[] = [];
    const duplicatedErrors: ErrorDetail[] = [];

    for (const {
      tableName,
      fieldName,
      fieldValue,
      checkType,
      fieldNameResponse,
    } of params) {
      if (fieldValue === undefined) {
        continue;
      }

      const query = `SELECT * FROM ${tableName} WHERE ${fieldName} = ?;`;
      const result = await this.databaseService.query(query, [fieldValue]);

      if (checkType === 'existence' && result.length === 0) {
        notFoundErrors.push({
          field: fieldNameResponse,
          message: `${fieldNameResponse} not found`,
        });
      }

      if (checkType === 'duplication' && result.length > 0) {
        duplicatedErrors.push({
          field: fieldNameResponse,
          message: `${fieldNameResponse} conflict`,
        });
      }
    }

    if (notFoundErrors.length > 0 || duplicatedErrors.length > 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        details: {
          notFoundErrors,
          duplicatedErrors,
        },
      });
    }
  }
}
