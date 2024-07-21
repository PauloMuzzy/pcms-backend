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
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Public } from 'src/modules/auth/public.decorator';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { FindAllPatientsResponseDto } from 'src/modules/patients/dto/find-all-patients-response.dto';
import { FindPatientRequestDto } from 'src/modules/patients/dto/find-patients-request.dto';
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
  async create(@Body() body: CreatePatientRequestDto) {
    await this.patientsService.create(body);
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

  //@UseGuards(JwtAuthGuard)
  @Public()
  @UsePipes(new CustomRequestValidatorPipe(FindPatientRequestDto))
  @ApiCommonResponses()
  @ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: [FindAllPatientsResponseDto],
  })
  @Get()
  async find(@Query() requestParameters: FindPatientRequestDto) {
    return await this.patientsService.find(requestParameters);
  }
}
