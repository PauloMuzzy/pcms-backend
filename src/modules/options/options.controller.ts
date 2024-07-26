import { Controller, Get, Param, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRoute } from 'src/common/decorators/swagger-route.decorator';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { FIND_OPTIONS_LIST_SWAGGER_DOC } from 'src/modules/options/documentation/swagger-decorators';
import { FindOptionsListRequestDto } from 'src/modules/options/dto/find-options-list-request.dto';
import { FindOptionsListResponseDto } from 'src/modules/options/dto/find-options-list-response.dto';
import { OptionsService } from './options.service';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(FindOptionsListRequestDto))
  @SwaggerRoute(FIND_OPTIONS_LIST_SWAGGER_DOC)
  @Get(':name')
  async findOptionsList(
    @Param('name') param: FindOptionsListRequestDto,
  ): Promise<FindOptionsListResponseDto[]> {
    return await this.optionsService.findOptionsList(param.name);
  }
}
