import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DuplicateDetectorService } from './duplicate-detector.service';

@Module({
  imports: [DatabaseModule],
  providers: [DuplicateDetectorService],
  exports: [DuplicateDetectorService],
})
export class DuplicateDetectorModule {}
