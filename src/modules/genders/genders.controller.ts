import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GendersService } from './genders.service';

@ApiTags('genders')
@ApiBearerAuth()
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Get()
  findAll() {
    return this.gendersService.findAll();
  }
}
