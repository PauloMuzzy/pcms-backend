import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { FindSessionReportsPerPatientResponseDto } from 'src/modules/reports/dto/find-session-reports-per-patient-response.dto';
import { ReportsService } from 'src/modules/reports/reports.service';

@ApiTags('Reports')
@Controller('session-reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':patientId')
  @ApiResponse({
    status: 200,
    description: 'Return all psychological reports of a patient.',
    type: [FindSessionReportsPerPatientResponseDto],
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAllReportsByPatient(
    @Param('patientId') patientId: number,
  ): Promise<FindSessionReportsPerPatientResponseDto> {
    return await this.reportsService.find(patientId);
  }
}
