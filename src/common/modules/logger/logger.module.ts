import { Module } from '@nestjs/common';
import { Logger } from 'src/common/modules/logger/logger.service';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
