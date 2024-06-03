import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    private readonly _message: string,
    private readonly _error: string,
    private readonly _statusCode: HttpStatus,
  ) {
    super(_message, _statusCode);
  }

  getResponse(): string | object {
    return {
      statusCode: this._statusCode,
      error: this._error,
      message: this._message,
    };
  }
}
