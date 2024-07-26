import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from 'src/modules/auth/dto/login-request.dto';
import { LoginResponseDto } from 'src/modules/auth/dto/login-response.dto';
import { Public } from 'src/modules/auth/public.decorator';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOkResponse({ type: LoginResponseDto })
  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.validateUser(body);
  }
}
