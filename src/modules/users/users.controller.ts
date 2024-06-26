import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/auth/public.decorator';
import { CreateUserRequestDto } from 'src/modules/users/dto/create-user-request.dto';
import { FindAllUsersResponseDto } from 'src/modules/users/dto/find-all-users-response.dto';
import { UsersService } from 'src/modules/users/users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //@UseGuards(JwtAuthGuard)
  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return all users.',
    type: [FindAllUsersResponseDto],
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll() {
    return true;
  }

  //@UseGuards(JwtAuthGuard)
  @Public()
  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Register user successful.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(@Body() body: CreateUserRequestDto) {
    return true;
  }
}
