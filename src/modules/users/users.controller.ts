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
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRoute } from 'src/common/decorators/swagger-route.decorator';
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import {
  CREATE_USER_SWAGGER_DOC,
  EDIT_USER_SWAGGER_DOC,
  FIND_USERS_SWAGGER_DOC,
  REMOVE_USER_SWAGGER_DOC,
} from 'src/modules/users/documentation/swagger-decorators';
import { CreateUserRequestDto } from 'src/modules/users/dto/create-user-request.dto';
import { EditUserRequestDto } from 'src/modules/users/dto/edit-user-request.dto';
import { FindUsersRequestDto } from 'src/modules/users/dto/find-users-request.dto';
import { FindUsersResponseDto } from 'src/modules/users/dto/find-users-response.dto';
import { RemoveUserRequestDto } from 'src/modules/users/dto/remove-user-request.dto';
import { UsersService } from 'src/modules/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @UseFilters(ConflictExceptionFilter)
  @UsePipes(new CustomRequestValidatorPipe(CreateUserRequestDto))
  @SwaggerRoute(CREATE_USER_SWAGGER_DOC)
  @Post()
  async create(@Body() body: CreateUserRequestDto) {
    await this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(FindUsersRequestDto))
  @SwaggerRoute(FIND_USERS_SWAGGER_DOC)
  @Get()
  async find(
    @Query() query: FindUsersRequestDto,
  ): Promise<FindUsersResponseDto[]> {
    return this.usersService.find(query);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(EditUserRequestDto))
  @SwaggerRoute(EDIT_USER_SWAGGER_DOC)
  @Patch()
  async edit(@Body() body: EditUserRequestDto) {
    await this.usersService.edit(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(RemoveUserRequestDto))
  @SwaggerRoute(REMOVE_USER_SWAGGER_DOC)
  @Delete(':uuid')
  async remove(@Param('uuid') param: RemoveUserRequestDto) {
    await this.usersService.remove(param);
  }
}
