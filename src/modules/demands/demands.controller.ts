import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { DemandsService } from './demands.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { UpdateDemandStatusDto } from './dto/update-demand-status.dto';

@ApiTags('demands')
@ApiBearerAuth()
@Controller('demands')
export class DemandsController {
  constructor(private readonly demandsService: DemandsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all demands with optional status filter' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by status' })
  @ApiResponse({ status: 200, description: 'Returns all demands' })
  findAll(@Query('status') status?: string) {
    return this.demandsService.findAll(status);
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get all demands for a patient' })
  @ApiResponse({ status: 200, description: 'Returns patient demands' })
  findByPatient(@Param('patientId') patientId: string) {
    return this.demandsService.findByPatient(patientId);
  }

  @Get('psychologist/:psychologistId')
  @ApiOperation({ summary: 'Get all demands for a psychologist' })
  @ApiResponse({ status: 200, description: 'Returns psychologist demands' })
  findByPsychologist(@Param('psychologistId') psychologistId: string) {
    return this.demandsService.findByPsychologist(psychologistId);
  }

  @Get('theme/:themeId')
  @ApiOperation({ summary: 'Get all demands for a theme' })
  @ApiResponse({ status: 200, description: 'Returns theme demands' })
  findByTheme(@Param('themeId') themeId: string) {
    return this.demandsService.findByTheme(themeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a demand by ID' })
  @ApiResponse({ status: 200, description: 'Returns the demand' })
  @ApiResponse({ status: 404, description: 'Demand not found' })
  findOne(@Param('id') id: string) {
    return this.demandsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new demand' })
  @ApiResponse({ status: 201, description: 'Demand successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createDemandDto: CreateDemandDto) {
    return this.demandsService.create(createDemandDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a demand' })
  @ApiResponse({ status: 200, description: 'Demand successfully updated' })
  @ApiResponse({ status: 404, description: 'Demand not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(@Param('id') id: string, @Body() updateDemandDto: UpdateDemandDto) {
    return this.demandsService.update(id, updateDemandDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update demand status with validation' })
  @ApiResponse({ status: 200, description: 'Demand status successfully updated' })
  @ApiResponse({ status: 404, description: 'Demand not found' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateDemandStatusDto) {
    return this.demandsService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a demand' })
  @ApiResponse({ status: 204, description: 'Demand successfully deleted' })
  @ApiResponse({ status: 404, description: 'Demand not found' })
  @ApiResponse({ status: 400, description: 'Cannot delete demand in progress' })
  delete(@Param('id') id: string) {
    return this.demandsService.delete(id);
  }
}
