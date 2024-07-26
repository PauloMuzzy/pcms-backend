import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from 'src/modules/auth/dto/login-request.dto';
import { LoginResponseDto } from 'src/modules/auth/dto/login-response.dto';
import { UsersService } from 'src/modules/users/users.service';
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(body: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findCredentials(body.email);

    if (!user.password) {
      throw new BadRequestException('Usuário ou Senha Inválidos');
    }

    if (await bcrypt.compare(body.password, user.password)) {
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
