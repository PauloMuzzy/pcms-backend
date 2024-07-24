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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiCommonResponses,
  ApiCreatedResponse,
  ApiOkResponse,
} from 'src/common/decorators/api-responses.decorator';
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
@ApiBearerAuth()
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(JwtAuthGuard)
  @UseFilters(ConflictExceptionFilter)
  @UsePipes(new CustomRequestValidatorPipe(CreatePatientRequestDto))
  @ApiCommonResponses()
  @ApiCreatedResponse()
  @Post()
  async create(@Body() body: CreatePatientRequestDto) {
    await this.patientsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(FindPatientRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse(FindPatientsResponseDto)
  @Get()
  async find(@Query() query: FindPatientRequestDto) {
    return this.patientsService.find(query);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(UpdatePatientRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse()
  @Put()
  async update(@Body() body: UpdatePatientRequestDto) {
    await this.patientsService.update(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(DeletePatientRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse()
  @Delete(':uuid')
  async deleteOne(@Param('uuid') param: DeletePatientRequestDto) {
    await this.patientsService.delete(param.uuid);
  }
}
