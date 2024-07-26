import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';

export const LOGIN_SWAGGER_DOC = [
  ApiOperation({ summary: 'Login to the application' }),
  ApiBody({ type: LoginRequestDto }),
  ApiOkResponse({
    type: LoginResponseDto,
    description: 'Successfully logged in',
  }),
  ApiBadRequestResponse({ description: 'Invalid login request' }),
  ApiUnauthorizedResponse({ description: 'Invalid credentials' }),
  ApiInternalServerErrorResponse({ description: 'Server error occurred' }),
];
