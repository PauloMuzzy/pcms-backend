import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PsychologistsService } from './psychologists.service';
import { CreatePsychologistDto } from './dto/create-psychologist.dto';
import { UpdatePsychologistDto } from './dto/update-psychologist.dto';

@ApiTags('psychologists')
@ApiBearerAuth()
@Controller('psychologists')
export class PsychologistsController {
  constructor(private readonly psychologistsService: PsychologistsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active psychologists' })
  @ApiResponse({ status: 200, description: 'Returns all active psychologists' })
  findAll() {
    return this.psychologistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a psychologist by ID' })
  @ApiResponse({ status: 200, description: 'Returns the psychologist' })
  @ApiResponse({ status: 404, description: 'Psychologist not found' })
  findOne(@Param('id') id: string) {
    return this.psychologistsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new psychologist' })
  @ApiResponse({ status: 201, description: 'Psychologist successfully created' })
  @ApiResponse({ status: 409, description: 'Email, CPF, or CRP already exists' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createPsychologistDto: CreatePsychologistDto) {
    return this.psychologistsService.create(createPsychologistDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a psychologist' })
  @ApiResponse({ status: 200, description: 'Psychologist successfully updated' })
  @ApiResponse({ status: 404, description: 'Psychologist not found' })
  @ApiResponse({ status: 409, description: 'Email, CPF, or CRP already exists' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(@Param('id') id: string, @Body() updatePsychologistDto: UpdatePsychologistDto) {
    return this.psychologistsService.update(id, updatePsychologistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a psychologist' })
  @ApiResponse({ status: 204, description: 'Psychologist successfully deleted' })
  @ApiResponse({ status: 404, description: 'Psychologist not found' })
  delete(@Param('id') id: string) {
    return this.psychologistsService.delete(id);
  }
}
