import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/modules/database/database.service';
import { UniqueRegisterCheckerService } from './unique-register-checker.service';

@Module({
  providers: [UniqueRegisterCheckerService, DatabaseService],
  exports: [UniqueRegisterCheckerService],
})
export class UniqueRegisterCheckerModule {}
