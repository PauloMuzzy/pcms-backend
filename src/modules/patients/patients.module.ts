import { Module } from '@nestjs/common';

import { DuplicateDetectorModule } from 'src/common/modules/duplicate-detector/duplicate-detector.module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { DatabaseModule } from 'src/database/database.module';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  imports: [DatabaseModule, DuplicateDetectorModule, UuidModule],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
