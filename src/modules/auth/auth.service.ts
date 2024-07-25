import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from 'src/modules/auth/dto/login-response.dto';
import { UsersService } from 'src/modules/users/users.service';
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<LoginResponseDto> {
    const user = await this.usersService.findCredentials(email);

    if (!user.password) {
      throw new BadRequestException('Usuário ou Senha Inválidos');
    }

    if (await bcrypt.compare(password, user.password)) {
      return {
        access_token: this.jwtService.sign(
          { id: user.uuid },
          {
            secret: process.env.SECRET_KEY_JWT,
            expiresIn: '1d',
          },
        ),
      };
    }

    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }
}
