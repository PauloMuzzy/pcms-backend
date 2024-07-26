import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCommonResponses,
  ApiOkResponse,
} from 'src/common/decorators/api-responses.decorator';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { Public } from 'src/modules/auth/public.decorator';
import { FindOptionsListRequestDto } from 'src/modules/options/dto/find-options-list-request.dto';
import { FindOptionsListResponseDto } from 'src/modules/options/dto/find-options-list-response.dto';
import { OptionsService } from './options.service';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @Public()
  @UsePipes(new CustomRequestValidatorPipe(FindOptionsListRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse(FindOptionsListResponseDto)
  @Get(':name')
  async findOptionsList(
    @Param('name') param: FindOptionsListRequestDto,
  ): Promise<FindOptionsListResponseDto[]> {
    return await this.optionsService.findOptionsList(param.name);
  }
}
