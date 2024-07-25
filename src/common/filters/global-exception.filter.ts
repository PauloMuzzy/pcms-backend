import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../modules/logger/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    if (status !== 500) {
      if (exception instanceof HttpException) {
        const exceptionResponse = exception.getResponse();
        return response.status(status).json(exceptionResponse);
      } else {
        return response.status(status).json({ message: exception });
      }
    }

    const isHttpException = exception instanceof HttpException;
    const message = isHttpException
      ? exception.getResponse()
      : { message: 'Internal server error' };

    const stack = exception instanceof Error ? exception.stack || '' : '';
    const stackLines = stack.split('\n');
    const errorFileLine = stackLines.length > 1 ? stackLines[1].trim() : '';
    const errorFileMatch = /at (.+?) \((.+):(\d+):(\d+)\)/.exec(errorFileLine);
    const errorFile = errorFileMatch ? errorFileMatch[2] : 'Unknown';
    const errorLine = errorFileMatch ? errorFileMatch[3] : 'Unknown';
    const ip = request.ip || request.headers['x-forwarded-for'] || 'Unknown';
    const userAgent = request.headers['user-agent'] || 'Unknown';
    const errorMessage =
      typeof message === 'object' ? JSON.stringify(message) : message;

    this.loggerService.save({
      statusCode: status,
      path: request.url,
      ip: ip,
      userAgent: userAgent,
      errorMessage: errorMessage,
      stack: stack,
      file: errorFile,
      line: errorLine,
    });

    response.status(status).json({
      statusCode: status,
      error: 'Internal Server Error',
      message:
        'An internal server error has occurred, contact support to verify the issue',
    });
  }
}
