import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authConstants } from 'src/auth/auth.constants';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(userEmail);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    if (user.password === userPassword) {
      return await this.gerarToken(user);
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async gerarToken(payload: User) {
    return {
      access_token: this.jwtService.sign(
        { email: payload.email },
        {
          secret: authConstants.secret,
          expiresIn: '1d',
        },
      ),
    };
  }
}
