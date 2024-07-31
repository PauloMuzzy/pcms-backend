import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/modules/database/database.service';
import { RecordAndDuplicationCheckerService } from './record-and-duplication-checker.service';

@Module({
  providers: [RecordAndDuplicationCheckerService, DatabaseService],
  exports: [RecordAndDuplicationCheckerService],
})
export class RecordAndDuplicationCheckerModule {}
