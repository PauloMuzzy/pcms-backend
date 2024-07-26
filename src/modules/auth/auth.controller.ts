import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRoute } from 'src/common/decorators/swagger-route.decorator';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { LOGIN_SWAGGER_DOC } from 'src/modules/auth/documentation/swagger-decorators';
import { LoginRequestDto } from 'src/modules/auth/dto/login-request.dto';
import { LoginResponseDto } from 'src/modules/auth/dto/login-response.dto';
import { Public } from 'src/modules/auth/public.decorator';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @UsePipes(new CustomRequestValidatorPipe(LoginRequestDto))
  @SwaggerRoute(LOGIN_SWAGGER_DOC)
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.validateUser(body);
  }
}
