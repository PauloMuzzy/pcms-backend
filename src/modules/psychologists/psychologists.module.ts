import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { DatabaseModule } from 'src/common/modules/database/database.module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { PsychologistsController } from 'src/modules/psychologists/psychologists.controller';
import { PsychologistsService } from './psychologists.service';
import { RecordAndDuplicationCheckerModule } from 'src/common/modules/record-and-duplication-checker/record-and-duplication-checker.module';

@Module({
  imports: [
    DatabaseModule,
    UuidModule,
    MailerModule,
    RecordAndDuplicationCheckerModule,
  ],
  providers: [PsychologistsService],
  controllers: [PsychologistsController],
})
export class PsychologistsModule {}
