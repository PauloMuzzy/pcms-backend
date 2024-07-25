import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/common/modules/database/database.module';
import { UniqueFieldCheckerModule } from 'src/common/modules/unique-field-checker/unique-field-checker.module';
import { UniqueRegisterCheckerModule } from 'src/common/modules/unique-register-checker/unique-register-checker-module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersService } from './users.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    DatabaseModule,
    UuidModule,
    UniqueFieldCheckerModule,
    UniqueRegisterCheckerModule,
    MailerModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
