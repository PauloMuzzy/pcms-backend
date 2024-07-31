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
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreateSessionReportRequestDto } from 'src/modules/session-reports/dto/create-session-report-request.dto';
import { EditSessionReportRequestDto } from 'src/modules/session-reports/dto/edit-session-report-request.dto';
import { FindSessionReportsRequestDto } from 'src/modules/session-reports/dto/find-session-reports-request.dto';
import { RemoveSessionReportRequestDto } from 'src/modules/session-reports/dto/remove-session-report-request.dto';
import { SessionReportsService } from 'src/modules/session-reports/session-reports.service';

@ApiTags('Session Reports')
@Controller('session-reports')
export class SessionReportsController {
  constructor(private readonly sessionReportsService: SessionReportsService) {}

  @UseGuards(JwtAuthGuard)
  @UseFilters(ConflictExceptionFilter)
  @UsePipes(new CustomRequestValidatorPipe(CreateSessionReportRequestDto))
  @Post()
  async create(@Body() body: CreateSessionReportRequestDto) {
    await this.sessionReportsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(FindSessionReportsRequestDto))
  @Get()
  async find(@Query() query: FindSessionReportsRequestDto) {
    return this.sessionReportsService.find(query);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(EditSessionReportRequestDto))
  @Patch()
  async edit(@Body() body: EditSessionReportRequestDto) {
    await this.sessionReportsService.edit(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(RemoveSessionReportRequestDto))
  @Delete(':uuid')
  async remove(@Param('uuid') param: RemoveSessionReportRequestDto) {
    await this.sessionReportsService.remove(param);
  }
}
