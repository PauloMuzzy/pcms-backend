import { HttpException, HttpStatus } from '@nestjs/common';

export interface ConflictExceptionResponse {
  statusCode: number;
  message: string;
  details: FieldsProps;
}

type FieldsProps = string[];

export class ConflictException extends HttpException {
  constructor(public fields: string[]) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: 'Conflict error',
        details: fields,
      } as ConflictExceptionResponse,
      HttpStatus.CONFLICT,
    );
  }
}
