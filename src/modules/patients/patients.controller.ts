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
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { SearchPatientsDto } from './dto/search-patients.dto';

@ApiTags('patients')
@ApiBearerAuth()
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active patients' })
  @ApiResponse({ status: 200, description: 'Returns all active patients' })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search patients with filters and pagination' })
  @ApiResponse({ status: 200, description: 'Returns filtered patients with pagination metadata' })
  search(@Query() filters: SearchPatientsDto) {
    return this.patientsService.search(filters);
  }

  @Get('cpf/:cpf')
  @ApiOperation({ summary: 'Find patient by CPF' })
  @ApiResponse({ status: 200, description: 'Returns the patient' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  findByCpf(@Param('cpf') cpf: string) {
    return this.patientsService.findByCpf(cpf);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by ID' })
  @ApiResponse({ status: 200, description: 'Returns the patient' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'Patient successfully created' })
  @ApiResponse({ status: 409, description: 'CPF already exists' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a patient' })
  @ApiResponse({ status: 200, description: 'Patient successfully updated' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  @ApiResponse({ status: 409, description: 'CPF already exists' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a patient' })
  @ApiResponse({ status: 204, description: 'Patient successfully deleted' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  delete(@Param('id') id: string) {
    return this.patientsService.delete(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restore a soft-deleted patient' })
  @ApiResponse({ status: 200, description: 'Patient successfully restored' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  restore(@Param('id') id: string) {
    return this.patientsService.restore(id);
  }
}
