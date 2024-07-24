import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from 'src/database/database.module';
import { CronJobController } from './cron-job.controller';
import { CronJobService } from './cron-job.service';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule],
  providers: [CronJobService],
  controllers: [CronJobController],
})
export class CronJobModule {}
