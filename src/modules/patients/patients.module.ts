import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/common/modules/database/database.module';
import { UniqueFieldCheckerModule } from 'src/common/modules/unique-field-checker/unique-field-checker.module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  imports: [DatabaseModule, UniqueFieldCheckerModule, UuidModule],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
