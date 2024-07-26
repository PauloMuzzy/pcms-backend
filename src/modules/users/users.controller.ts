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
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiCommonResponses } from 'src/common/decorators/api-responses.decorator';
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { Public } from 'src/modules/auth/public.decorator';
import { CreateUserRequestDto } from 'src/modules/users/dto/create-user-request.dto';
import { DeleteUserRequestDto } from 'src/modules/users/dto/delete-user-request.dto';
import { FindUsersRequestDto } from 'src/modules/users/dto/find-users-request.dto';
import { UpdateUserRequestDto } from 'src/modules/users/dto/update-user-request.dto';
import { UsersService } from 'src/modules/users/users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @UseFilters(ConflictExceptionFilter)
  @UsePipes(new CustomRequestValidatorPipe(CreateUserRequestDto))
  @ApiCommonResponses()
  @ApiCreatedResponse()
  @Post()
  async create(@Body() body: CreateUserRequestDto) {
    await this.usersService.create(body);
  }

  @Public()
  @UsePipes(new CustomRequestValidatorPipe(FindUsersRequestDto))
  @ApiCommonResponses()
  @Get()
  async find(@Query() query: FindUsersRequestDto) {
    return this.usersService.find(query);
  }

  @Public()
  @UsePipes(new CustomRequestValidatorPipe(UpdateUserRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse()
  @Patch()
  async edit(@Body() body: UpdateUserRequestDto) {
    await this.usersService.edit(body);
  }

  @Public()
  @UsePipes(new CustomRequestValidatorPipe(DeleteUserRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse()
  @Delete(':uuid')
  async delete(@Param('uuid') param: DeleteUserRequestDto) {
    await this.usersService.remove(param.uuid);
  }
}
