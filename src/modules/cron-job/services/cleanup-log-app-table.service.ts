import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/common/modules/database/database.service';

@Injectable()
export class CleanupLogAppTableService {
  constructor(private readonly databaseService: DatabaseService) {}

  async clearLogs(): Promise<void> {
    const sql = 'DELETE FROM log_app';
    try {
      await this.databaseService.query(sql);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
