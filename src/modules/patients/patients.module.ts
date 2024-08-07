import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/common/modules/database/database.module';
import { RecordAndDuplicationCheckerModule } from 'src/common/modules/record-and-duplication-checker/record-and-duplication-checker.module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  imports: [DatabaseModule, UuidModule, RecordAndDuplicationCheckerModule],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
