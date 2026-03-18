import { Module, Global } from '@nestjs/common';
import { ClerkService } from './clerk.service';

@Global()
@Module({
  providers: [ClerkService],
  exports: [ClerkService],
})
export class ClerkModule {}
