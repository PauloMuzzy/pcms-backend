import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/modules/logger/logger.module';
import { UniqueFieldCheckerModule } from 'src/common/modules/unique-field-checker/unique-field-checker.module';
import { UniqueRegisterCheckerModule } from 'src/common/modules/unique-register-checker/unique-register-checker-module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { mailerConfig } from 'src/config/mailer/mailer.config';
import { AditionalInformationsModule } from 'src/modules/aditional-informations/aditional-informations.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CronJobsModule } from 'src/modules/cron-jobs/cron-jobs.module';
import { DemandsModule } from 'src/modules/demands/demands.module';
import { OptionsModule } from 'src/modules/options/options.module';
import { PatientsModule } from 'src/modules/patients/patients.module';
import { SessionReportsModule } from 'src/modules/session-reports/session-reports.module';
import { UsersModule } from 'src/modules/users/users.module';
require('dotenv').config();

@Module({
  imports: [
    MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
    PatientsModule,
    SessionReportsModule,
    AditionalInformationsModule,
    OptionsModule,
    UniqueFieldCheckerModule,
    UniqueRegisterCheckerModule,
    UuidModule,
    LoggerModule,
    CronJobsModule,
    DemandsModule,
  ],
})
export class AppModule {}
