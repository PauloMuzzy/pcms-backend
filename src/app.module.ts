import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/modules/logger/logger.module';
import { RecordAndDuplicationCheckerModule } from 'src/common/modules/record-and-duplication-checker/record-and-duplication-checker.module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { mailerConfig } from 'src/config/mailer/mailer.config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CronJobsModule } from 'src/modules/cron-jobs/cron-jobs.module';
import { DemandsModule } from 'src/modules/demands/demands.module';
import { OptionsModule } from 'src/modules/options/options.module';
import { PatientsModule } from 'src/modules/patients/patients.module';
import { PsychologistsModule } from 'src/modules/psychologists/psychologists.module';
import { SessionReportsModule } from 'src/modules/session-reports/session-reports.module';
require('dotenv').config();

@Module({
  imports: [
    MailerModule.forRoot(mailerConfig),
    PsychologistsModule,
    AuthModule,
    PatientsModule,
    OptionsModule,
    UuidModule,
    LoggerModule,
    CronJobsModule,
    DemandsModule,
    SessionReportsModule,
    RecordAndDuplicationCheckerModule,
  ],
})
export class AppModule {}
