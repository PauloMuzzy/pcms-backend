import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { UuidModule } from 'src/modules/uuid/uuid.module';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  imports: [DatabaseModule, UuidModule],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
