import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/config/database/database.config';
import { mailerConfig } from 'src/config/mailer/mailer.config';
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
    TypeOrmModule.forRoot(databaseConfig),
    MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
    PatientsModule,
    SessionReportsModule,
    AditionalInformationsModule,
  ],
  controllers: [SessionReportsController],
  providers: [SessionReportsService],
})
export class AppModule {}
