import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/config/database/database.config';
import { mailerConfig } from 'src/config/mailer/mailer.config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PatientsModule } from 'src/modules/patients/patients.module';
import { UsersModule } from 'src/modules/users/users.module';
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
