import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/modules/database/database.module';
import { UniqueFieldCheckerService } from './unique-field-checker.service';

@Module({
  imports: [DatabaseModule],
  providers: [UniqueFieldCheckerService],
  exports: [UniqueFieldCheckerService],
})
export class UniqueFieldCheckerModule {}
