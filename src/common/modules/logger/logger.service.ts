import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LoggerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(params: {
    statusCode: number;
    path: string;
    ip: string | string[];
    userAgent: string;
    errorMessage: string;
    stack?: string;
    file?: string;
    line?: string;
  }): Promise<void> {
    const query = `
      INSERT INTO log_app (
        status_code,
        path,
        ip,
        user_agent,
        error_message,
        stack,
        file,
        line
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      params.statusCode,
      params.path,
      params.ip,
      params.userAgent,
      params.errorMessage,
      params.stack || null,
      params.file || null,
      params.line || null,
    ];

    try {
      await this.databaseService.query(query, values);
    } catch (error) {
      console.error('Error saving log:', error);
    }
  }
}
