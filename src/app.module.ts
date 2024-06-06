import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/database/database.config';
import { mailerConfig } from 'src/mailer/mailer.config';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
    PatientsModule,
  ],
})
export class AppModule {}
