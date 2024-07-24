import { Module } from '@nestjs/common';
import { LoggerService } from 'src/common/modules/logger/logger.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
