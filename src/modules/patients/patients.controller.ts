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
import {
  CREATE_PATIENT_SWAGGER_DOC,
  EDIT_PATIENT_SWAGGER_DOC,
  FIND_PATIENTS_SWAGGER_DOC,
  REMOVE_PATIENT_SWAGGER_DOC,
} from 'src/modules/patients/documentation/swagger-decorators';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { DeletePatientRequestDto } from 'src/modules/patients/dto/delete-patient-request.dto';
import { FindPatientRequestDto } from 'src/modules/patients/dto/find-patients-request.dto';
import { UpdatePatientRequestDto } from 'src/modules/patients/dto/update-patient-request.dto';
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
  @UsePipes(new CustomRequestValidatorPipe(FindPatientRequestDto))
  @SwaggerRoute(FIND_PATIENTS_SWAGGER_DOC)
  @Get()
  async find(@Query() query: FindPatientRequestDto) {
    return this.patientsService.find(query);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(UpdatePatientRequestDto))
  @SwaggerRoute(EDIT_PATIENT_SWAGGER_DOC)
  @Patch()
  async edit(@Body() body: UpdatePatientRequestDto) {
    await this.patientsService.edit(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(DeletePatientRequestDto))
  @SwaggerRoute(REMOVE_PATIENT_SWAGGER_DOC)
  @Delete(':uuid')
  async remove(@Param('uuid') param: DeletePatientRequestDto) {
    await this.patientsService.remove(param.uuid);
  }
}
