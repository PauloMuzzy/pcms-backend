import { Module } from '@nestjs/common';
import { SessionReportsController } from 'src/modules/session-reports/session-reports.controller';
import { SessionReportsService } from 'src/modules/session-reports/session-reports.service';

@Module({
  controllers: [SessionReportsController],
  providers: [SessionReportsService],
})
export class SessionReportsModule {}
