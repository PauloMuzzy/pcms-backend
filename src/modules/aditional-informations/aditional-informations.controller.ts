import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AditionalInformationsService } from 'src/modules/aditional-informations/aditional-informations.service';
import { CreateAditionInformationsRequestDto } from 'src/modules/aditional-informations/dto/create-aditional-informations-request.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@ApiTags('Aditional Informations')
@Controller('aditional-informations')
export class AditionalInformationsController {
  constructor(
    private aditionalInformationsService: AditionalInformationsService,
  ) {}

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
  async create(@Body() body: CreateAditionInformationsRequestDto) {
    await this.aditionalInformationsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-by-patient')
  @ApiResponse({
    status: 200,
    description: 'Return all aditional informations of a patient.',
    type: CreateAditionInformationsRequestDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findByPatientId(@Query('patientId') patientId: number) {
    await this.aditionalInformationsService.findByPatientId(patientId);
  }
}
