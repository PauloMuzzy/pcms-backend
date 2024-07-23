import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../modules/logger/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    if (status === 500) {
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : { message: 'Internal server error' };

      const stack = exception instanceof Error ? exception.stack : '';

      this.logger.log({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: message,
        stack: stack,
      });

      response.status(500).json({
        statusCode: status,
        error: 'Internal Server Error',
        message:
          'An internal server error has occurred, contact support to verify the issue',
      });
    } else {
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : { message: 'Unexpected error' };

      response.status(status).json(message);
    }
  }
}
