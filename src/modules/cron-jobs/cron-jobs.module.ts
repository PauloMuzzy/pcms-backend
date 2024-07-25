import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from 'src/common/modules/database/database.module';
import { CleanupLogAppTableService } from 'src/modules/cron-jobs/services/cleanup-log-app-table.service';
import { CronJobsController } from './cron-jobs.controller';
import { CronJobsService } from './cron-jobs.service';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule],
  providers: [CronJobsService, CleanupLogAppTableService],
  controllers: [CronJobsController],
})
export class CronJobsModule {}
