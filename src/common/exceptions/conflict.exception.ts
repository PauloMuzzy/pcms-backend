import { HttpException, HttpStatus } from '@nestjs/common';

export interface ConflictExceptionResponse {
  statusCode: number;
  message: string;
  fields: string[];
}

export class ConflictException extends HttpException {
  constructor(public fields: string[]) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: 'Conflict error',
        fields,
      } as ConflictExceptionResponse,
      HttpStatus.CONFLICT,
    );
  }
}
