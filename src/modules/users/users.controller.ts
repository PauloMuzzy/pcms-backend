import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreateUserRequestDto } from 'src/modules/users/dto/create-user-request.dto';
import { DeleteUserRequestDto } from 'src/modules/users/dto/delete-user-request.dto';
import { FindUsersRequestDto } from 'src/modules/users/dto/find-users-request.dto';
import { FindUsersResponseDto } from 'src/modules/users/dto/find-users-response.dto';
import { UpdateUserRequestDto } from 'src/modules/users/dto/update-user-request.dto';
import { UsersService } from 'src/modules/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @UseFilters(ConflictExceptionFilter)
  @UsePipes(new CustomRequestValidatorPipe(CreateUserRequestDto))
  @ApiCreatedResponse()
  @Post()
  async create(@Body() body: CreateUserRequestDto) {
    await this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(FindUsersRequestDto))
  @ApiOkResponse({ type: [FindUsersResponseDto] })
  @Get()
  async find(
    @Query() query: FindUsersRequestDto,
  ): Promise<FindUsersResponseDto[]> {
    return this.usersService.find(query);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(UpdateUserRequestDto))
  @ApiOkResponse()
  @Patch()
  async edit(@Body() body: UpdateUserRequestDto) {
    await this.usersService.edit(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(DeleteUserRequestDto))
  @ApiOkResponse()
  @Delete(':uuid')
  async delete(@Param('uuid') param: DeleteUserRequestDto) {
    await this.usersService.remove(param.uuid);
  }
}
