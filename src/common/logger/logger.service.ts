import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { winstonConfig } from '@config/logger/winston.config';

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: string, context?: string) {
    winstonConfig.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    winstonConfig.error(message, { context, trace });
  }

  warn(message: string, context?: string) {
    winstonConfig.warn(message, { context });
  }

  debug(message: string, context?: string) {
    winstonConfig.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    winstonConfig.verbose(message, { context });
  }
}
