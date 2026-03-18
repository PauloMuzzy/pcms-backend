import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DemandThemesService } from './demand-themes.service';

@ApiTags('demand-themes')
@ApiBearerAuth()
@Controller('demand-themes')
export class DemandThemesController {
  constructor(private readonly demandThemesService: DemandThemesService) {}

  @Get()
  findAll() {
    return this.demandThemesService.findAll();
  }
}
