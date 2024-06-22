import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ValidationService } from 'src/common/services/validation/validation.service';
import { mailerConfig } from 'src/config/mailer/mailer.config';
import { DatabaseModule } from 'src/database/database.module';
import { AditionalInformationsModule } from 'src/modules/aditional-informations/aditional-informations.module';
import { AuthModule } from 'src/modules/auth/auth.module';

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
  ],
  controllers: [SessionReportsController],
  providers: [SessionReportsService, ValidationService],
})
export class AppModule {}
