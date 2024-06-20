import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/modules/auth/auth.controller';
import { JwtStrategy } from 'src/modules/auth/jwt.strategy';
import { LocalStrategy } from 'src/modules/auth/local.auth';
import { DatabaseModule } from 'src/modules/database/database.module';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule, JwtModule, DatabaseModule],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
