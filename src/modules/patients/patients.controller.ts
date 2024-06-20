import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { FindAllPatientsResponseDto } from 'src/modules/patients/dto/find-all-patients-response.dto';
import { UpdateOnePatientRequestDto } from 'src/modules/patients/dto/update-one-patient-request.dto';
import { PatientsService } from 'src/modules/patients/patients.service';
import {
  ApiCommonResponses,
  ApiCreatedResponse,
  ApiOkResponse,
} from 'src/utils/decorators/api-responses.decorator';

@ApiTags('Patients')
@Controller('patients')
@ApiBearerAuth()
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiCommonResponses()
  @ApiCreatedResponse()
  async create(@Body() body: CreatePatientRequestDto) {
    await this.patientsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiCommonResponses()
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: [FindAllPatientsResponseDto],
  })
  async findAll() {
    return await this.patientsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':patientUUID')
  @ApiCommonResponses()
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: FindAllPatientsResponseDto,
  })
  async findById(@Param('patientUUID') patientUUID: string) {
    return await this.patientsService.findOne(patientUUID);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':patientUUID')
  @ApiCommonResponses()
  @ApiOkResponse()
  async updateOne(
    @Body() body: UpdateOnePatientRequestDto,
    @Param('patientUUID') patientUUID: string,
  ) {
    await this.patientsService.updateOne(patientUUID, body);
  }
}
