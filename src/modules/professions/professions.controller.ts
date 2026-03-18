import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProfessionsService } from './professions.service';

@ApiTags('professions')
@ApiBearerAuth()
@Controller('professions')
export class ProfessionsController {
  constructor(private readonly professionsService: ProfessionsService) {}

  @Get()
  findAll() {
    return this.professionsService.findAll();
  }
}
