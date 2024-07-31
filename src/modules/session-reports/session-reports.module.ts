import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/modules/database/database.module';
import { RecordAndDuplicationCheckerModule } from 'src/common/modules/record-and-duplication-checker/record-and-duplication-checker.module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { SessionReportsController } from 'src/modules/session-reports/session-reports.controller';
import { SessionReportsService } from 'src/modules/session-reports/session-reports.service';

@Module({
  imports: [DatabaseModule, UuidModule, RecordAndDuplicationCheckerModule],
  controllers: [SessionReportsController],
  providers: [SessionReportsService],
})
export class SessionReportsModule {}
