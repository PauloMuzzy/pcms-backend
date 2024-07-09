import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/auth/public.decorator';
import { FindOptionsListRequestDto } from 'src/modules/options/dto/find-options-list-request.dto';
import { OptionsService } from './options.service';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @Public()
  @Get(':optionName')
  async findOptionsList(
    @Param() optionsDto: FindOptionsListRequestDto,
  ): Promise<any> {
    return await this.optionsService.findOptionsList(optionsDto.optionName);
  }
}