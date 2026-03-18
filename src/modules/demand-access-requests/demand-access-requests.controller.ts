import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DemandAccessRequestsService } from './demand-access-requests.service';

@ApiTags('demand-access-requests')
@ApiBearerAuth()
@Controller('demand-access-requests')
export class DemandAccessRequestsController {
  constructor(private readonly demandAccessRequestsService: DemandAccessRequestsService) {}

  @Get()
  findAll() {
    return this.demandAccessRequestsService.findAll();
  }

  @Get('demand/:demandId')
  findByDemand(@Param('demandId') demandId: string) {
    return this.demandAccessRequestsService.findByDemand(demandId);
  }
}
