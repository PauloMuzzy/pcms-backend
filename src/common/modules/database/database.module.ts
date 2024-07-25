import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/common/modules/database/database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
