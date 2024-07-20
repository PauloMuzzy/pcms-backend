import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiCommonResponses,
  ApiCreatedResponse,
  ApiOkResponse,
} from 'src/common/decorators/api-responses.decorator';
import { QueryBuilderDto } from 'src/common/dtos/query-builder.dto';
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { CustomQueryPipe } from 'src/common/pipes/custom-query-validation.pipe';
import { CustomValidationPipe } from 'src/common/pipes/custom-validation.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { FindAllPatientsResponseDto } from 'src/modules/patients/dto/find-all-patients-response.dto';
import { UpdateOnePatientRequestDto } from 'src/modules/patients/dto/update-one-patient-request.dto';
import { PatientsService } from 'src/modules/patients/patients.service';

@ApiTags('Patients')
@Controller('patients')
@ApiBearerAuth()
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseFilters(ConflictExceptionFilter)
  @ApiCommonResponses()
  @ApiCreatedResponse()
  @UsePipes(new CustomValidationPipe())
  async create(@Body() body: CreatePatientRequestDto) {
    await this.patientsService.create(body);
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

  @UseGuards(JwtAuthGuard)
  @Delete(':patientUUID')
  @ApiCommonResponses()
  @ApiOkResponse()
  async deleteOne(@Param('patientUUID') patientUUID: string) {
    await this.patientsService.deleteOne(patientUUID);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiCommonResponses()
  @UsePipes(new CustomQueryPipe())
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: [FindAllPatientsResponseDto],
  })
  async find(@Query() queryBuilderDto: QueryBuilderDto) {
    return await this.patientsService.find(queryBuilderDto);
  }
}
