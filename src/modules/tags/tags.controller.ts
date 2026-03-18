import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TagsService } from './tags.service';

@ApiTags('tags')
@ApiBearerAuth()
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get('psychologist/:psychologistId')
  findByPsychologist(@Param('psychologistId') psychologistId: string) {
    return this.tagsService.findByPsychologist(psychologistId);
  }
}
