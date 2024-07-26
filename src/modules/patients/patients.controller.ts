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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { DeletePatientRequestDto } from 'src/modules/patients/dto/delete-patient-request.dto';
import { FindPatientRequestDto } from 'src/modules/patients/dto/find-patients-request.dto';
import { FindPatientsResponseDto } from 'src/modules/patients/dto/find-patients-response.dto';
import { UpdatePatientRequestDto } from 'src/modules/patients/dto/update-patient-request.dto';
import { PatientsService } from 'src/modules/patients/patients.service';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(JwtAuthGuard)
  @UseFilters(ConflictExceptionFilter)
  @ApiOkResponse()
  @Post()
  async create(@Body() body: CreatePatientRequestDto) {
    await this.patientsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(FindPatientRequestDto))
  @ApiOkResponse({ type: [FindPatientsResponseDto] })
  @Get()
  async find(@Query() query: FindPatientRequestDto) {
    return this.patientsService.find(query);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(UpdatePatientRequestDto))
  @ApiOkResponse()
  @Patch()
  async edit(@Body() body: UpdatePatientRequestDto) {
    await this.patientsService.edit(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(DeletePatientRequestDto))
  @ApiOkResponse()
  @Delete(':uuid')
  async delete(@Param('uuid') param: DeletePatientRequestDto) {
    await this.patientsService.remove(param.uuid);
  }
}
