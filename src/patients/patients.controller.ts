import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePatientRequestDto } from 'src/patients/dto/create-patient/create-patient-request.dto';
import { FindAllPatientsResponsetDto } from 'src/patients/dto/find-all-patients/find-all-patients-response.dto';
import { PatientsService } from 'src/patients/patients.service';

@ApiTags('Patients')
@Controller('patients')
@ApiBearerAuth()
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  //@Public()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Register user successful.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(@Body() body: CreatePatientRequestDto) {
    await this.patientsService.create(body);
  }

  //@Public()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return all users.',
    type: [FindAllPatientsResponsetDto],
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(): Promise<FindAllPatientsResponsetDto[]> {
    return await this.patientsService.findAll();
  }
}
