import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/common/modules/database/database.module';
import { RecordAndDuplicationCheckerModule } from 'src/common/modules/record-and-duplication-checker/record-and-duplication-checker.module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { AuthController } from 'src/modules/auth/auth.controller';
import { JwtStrategy } from 'src/modules/auth/jwt.strategy';
import { LocalStrategy } from 'src/modules/auth/local.auth';
import { PsychologistsModule } from 'src/modules/psychologists/psychologists.module';
import { PsychologistsService } from 'src/modules/psychologists/psychologists.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule,
    PsychologistsModule,
    UuidModule,
    DatabaseModule,
    RecordAndDuplicationCheckerModule,
  ],
  providers: [AuthService, PsychologistsService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
