import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { DatabaseModule } from 'src/database/database.module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { ValidationService } from 'src/common/services/validation/validation.service';

@Module({
  imports: [DatabaseModule, UuidModule],
  providers: [PatientsService, ValidationService],
  controllers: [PatientsController],
})
export class PatientsModule {}
