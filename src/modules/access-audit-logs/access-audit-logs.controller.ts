import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AccessAuditLogsService } from './access-audit-logs.service';

@ApiTags('access-audit-logs')
@ApiBearerAuth()
@Controller('access-audit-logs')
export class AccessAuditLogsController {
  constructor(private readonly accessAuditLogsService: AccessAuditLogsService) {}

  @Get()
  findAll() {
    return this.accessAuditLogsService.findAll();
  }

  @Get('demand/:demandId')
  findByDemand(@Param('demandId') demandId: string) {
    return this.accessAuditLogsService.findByDemand(demandId);
  }
}
