import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { DuplicateDetectorModule } from 'src/common/modules/duplicate-detector/duplicate-detector.module';
import { LoggerModule } from 'src/common/modules/logger/logger.module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { mailerConfig } from 'src/config/mailer/mailer.config';
import { DatabaseModule } from 'src/database/database.module';
import { AditionalInformationsModule } from 'src/modules/aditional-informations/aditional-informations.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CronJobModule } from 'src/modules/cron-job/cron-job.module';
import { OptionsModule } from 'src/modules/options/options.module';

import { PatientsModule } from 'src/modules/patients/patients.module';
import { SessionReportsController } from 'src/modules/session-reports/session-reports.controller';
import { SessionReportsModule } from 'src/modules/session-reports/session-reports.module';
import { SessionReportsService } from 'src/modules/session-reports/session-reports.service';
import { UsersModule } from 'src/modules/users/users.module';
require('dotenv').config();

@Module({
  imports: [
    DatabaseModule,
    MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
    PatientsModule,
    SessionReportsModule,
    AditionalInformationsModule,
    OptionsModule,
    DuplicateDetectorModule,
    UuidModule,
    LoggerModule,
    CronJobModule,
  ],
  controllers: [SessionReportsController],
  providers: [SessionReportsService],
})
export class AppModule {}
