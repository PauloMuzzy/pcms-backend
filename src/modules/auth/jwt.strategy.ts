import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PsychologistsService } from 'src/modules/psychologists/psychologists.service';

require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private psychologistsService: PsychologistsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY_JWT,
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.psychologistsService.find({ uuid: payload.id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
