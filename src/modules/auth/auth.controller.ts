import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/auth/public.decorator';
import { AuthService } from './auth.service';
import { LoginResponseDto } from 'src/modules/auth/dto/login-response.dto';
import { LoginRequestDto } from 'src/modules/auth/dto/login-request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login successful.',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.validateUser(body.email, body.password);
  }
}
