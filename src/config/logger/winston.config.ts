import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const logDir = process.env.LOG_DIR || './logs';
const logLevel = process.env.LOG_LEVEL || 'info';

// Console transport (colorized for development)
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, context, trace }) => {
      const contextStr = context ? `[${context}]` : '';
      const traceStr = trace ? `\n${trace}` : '';
      return `${timestamp} ${level} ${contextStr} ${message}${traceStr}`;
    }),
  ),
});

// Combined logs (all levels)
const combinedFileTransport = new DailyRotateFile({
  dirname: `${logDir}/combined`,
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: process.env.LOG_MAX_SIZE || '20m',
  maxFiles: process.env.LOG_MAX_FILES || '14d',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
});

// Error logs only
const errorFileTransport = new DailyRotateFile({
  dirname: `${logDir}/errors`,
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: process.env.LOG_MAX_SIZE || '20m',
  maxFiles: process.env.LOG_MAX_FILES || '14d',
  level: 'error',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
});

// Create Winston Logger instance
export const winstonConfig = winston.createLogger({
  level: logLevel,
  transports: [consoleTransport, combinedFileTransport, errorFileTransport],
  exceptionHandlers: [
    new DailyRotateFile({
      dirname: `${logDir}/errors`,
      filename: 'exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      dirname: `${logDir}/errors`,
      filename: 'rejections-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
