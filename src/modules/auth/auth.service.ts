import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from 'src/modules/auth/dto/login-request.dto';
import { LoginResponseDto } from 'src/modules/auth/dto/login-response.dto';
import { PsychologistsService } from 'src/modules/psychologists/psychologists.service';
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private readonly psychologistsService: PsychologistsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(body: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.psychologistsService.findCredentials(body.email);

    if (!user.password) {
      throw new BadRequestException('Usuário ou Senha Inválidos');
    }

    if (await bcrypt.compare(body.password, user.password_hash)) {
      return {
        access_token: this.jwtService.sign(
          { id: user.uuid },
          {
            secret: process.env.SECRET_KEY_JWT,
            expiresIn: '30d',
          },
        ),
      };
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }
}
