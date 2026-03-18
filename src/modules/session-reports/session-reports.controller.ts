import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SessionReportsService } from './session-reports.service';
import { CreateSessionReportDto } from './dto/create-session-report.dto';
import { UpdateSessionReportDto } from './dto/update-session-report.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('session-reports')
@ApiBearerAuth()
@Controller('session-reports')
export class SessionReportsController {
  constructor(private readonly sessionReportsService: SessionReportsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all session reports' })
  @ApiResponse({ status: 200, description: 'Returns all session reports' })
  findAll() {
    return this.sessionReportsService.findAll();
  }

  @Get('demand/:demandId')
  @ApiOperation({ summary: 'Get all session reports for a demand' })
  @ApiResponse({ status: 200, description: 'Returns demand session reports' })
  findByDemand(@Param('demandId') demandId: string) {
    return this.sessionReportsService.findByDemand(demandId);
  }

  @Get('psychologist/:psychologistId')
  @ApiOperation({ summary: 'Get paginated session reports for a psychologist' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Returns psychologist session reports with pagination' })
  findByPsychologist(
    @Param('psychologistId') psychologistId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.sessionReportsService.findByPsychologist(psychologistId, page, limit);
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get paginated session reports for a patient' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Returns patient session reports with pagination' })
  findByPatient(
    @Param('patientId') patientId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.sessionReportsService.findByPatient(patientId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a session report by ID' })
  @ApiResponse({ status: 200, description: 'Returns the session report' })
  @ApiResponse({ status: 404, description: 'Session report not found' })
  findOne(@Param('id') id: string) {
    return this.sessionReportsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new session report' })
  @ApiResponse({ status: 201, description: 'Session report successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data or tag IDs' })
  create(
    @Body() createSessionReportDto: CreateSessionReportDto,
    @CurrentUser('id') psychologistId: string,
  ) {
    return this.sessionReportsService.create(createSessionReportDto, psychologistId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a session report' })
  @ApiResponse({ status: 200, description: 'Session report successfully updated' })
  @ApiResponse({ status: 404, description: 'Session report not found' })
  @ApiResponse({ status: 403, description: 'You can only update reports you created' })
  @ApiResponse({ status: 400, description: 'Invalid input data or tag IDs' })
  update(
    @Param('id') id: string,
    @Body() updateSessionReportDto: UpdateSessionReportDto,
    @CurrentUser('id') psychologistId: string,
  ) {
    return this.sessionReportsService.update(id, updateSessionReportDto, psychologistId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a session report' })
  @ApiResponse({ status: 204, description: 'Session report successfully deleted' })
  @ApiResponse({ status: 404, description: 'Session report not found' })
  @ApiResponse({ status: 403, description: 'You can only delete reports you created' })
  delete(@Param('id') id: string, @CurrentUser('id') psychologistId: string) {
    return this.sessionReportsService.delete(id, psychologistId);
  }
}
