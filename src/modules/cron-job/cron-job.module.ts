import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobController } from './cron-job.controller';
import { CronJobService } from './cron-job.service';
import { DatabaseModule } from 'src/common/modules/database/database.module';
import { CleanupLogAppTableService } from 'src/modules/cron-job/services/cleanup-log-app-table.service';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule],
  providers: [CronJobService, CleanupLogAppTableService],
  controllers: [CronJobController],
})
export class CronJobModule {}
