import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRoute } from 'src/common/decorators/swagger-route.decorator';
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RemovePatientRequestDto } from 'src/modules/demands/dto/remove-demand-request.dto';
import {
  CREATE_PATIENT_SWAGGER_DOC,
  EDIT_PATIENT_SWAGGER_DOC,
  FIND_PATIENTS_SWAGGER_DOC,
  REMOVE_PATIENT_SWAGGER_DOC,
} from 'src/modules/patients/documentation/swagger-decorators';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { EditPatientRequestDto } from 'src/modules/patients/dto/edit-patient-request.dto';
import { FindPatientsRequestDto } from 'src/modules/patients/dto/find-patients-request.dto';
import { PatientsService } from 'src/modules/patients/patients.service';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(CreatePatientRequestDto))
  @UseFilters(ConflictExceptionFilter)
  @SwaggerRoute(CREATE_PATIENT_SWAGGER_DOC)
  @Post()
  async create(@Body() body: CreatePatientRequestDto) {
    await this.patientsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(FindPatientsRequestDto))
  @SwaggerRoute(FIND_PATIENTS_SWAGGER_DOC)
  @Get()
  async find(@Query() query: FindPatientsRequestDto) {
    return this.patientsService.find(query);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(EditPatientRequestDto))
  @SwaggerRoute(EDIT_PATIENT_SWAGGER_DOC)
  @Patch()
  async edit(@Body() body: EditPatientRequestDto) {
    await this.patientsService.edit(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(RemovePatientRequestDto))
  @SwaggerRoute(REMOVE_PATIENT_SWAGGER_DOC)
  @Delete(':uuid')
  async remove(@Param('uuid') param: RemovePatientRequestDto) {
    await this.patientsService.remove(param);
  }
}
