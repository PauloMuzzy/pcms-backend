import { Controller, Get, Param, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { FindOptionsListRequestDto } from 'src/modules/options/dto/find-options-list-request.dto';
import { FindOptionsListResponseDto } from 'src/modules/options/dto/find-options-list-response.dto';
import { OptionsService } from './options.service';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(FindOptionsListRequestDto))
  @Get(':description')
  async find(
    @Param('description') param: FindOptionsListRequestDto,
  ): Promise<FindOptionsListResponseDto[]> {
    return await this.optionsService.find(param.description);
  }
}
