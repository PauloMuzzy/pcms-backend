import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/modules/database/database.module';
import { LoggerService } from 'src/common/modules/logger/logger.service';

@Module({
  imports: [DatabaseModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
