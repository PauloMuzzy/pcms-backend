import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { FindAllSessionReportsPerPatientResponseDto } from 'src/modules/session-reports/dto/find-all-session-reports-per-patient-response.dto';
import { SessionReportsService } from 'src/modules/session-reports/session-reports.service';

@Controller('session-reports')
export class SessionReportsController {
  constructor(private reportsService: SessionReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':patientId')
  @ApiResponse({
    status: 200,
    description: 'Return all psychological reports of a patient.',
    type: [FindAllSessionReportsPerPatientResponseDto],
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAllSessionReportsPerPatient(
    @Param('patientId') patientId: number,
  ): Promise<FindAllSessionReportsPerPatientResponseDto> {
    return await this.reportsService.find(patientId);
  }
}
