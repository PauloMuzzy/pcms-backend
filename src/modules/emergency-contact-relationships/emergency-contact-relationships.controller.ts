import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EmergencyContactRelationshipsService } from './emergency-contact-relationships.service';

@ApiTags('emergency-contact-relationships')
@ApiBearerAuth()
@Controller('emergency-contact-relationships')
export class EmergencyContactRelationshipsController {
  constructor(
    private readonly emergencyContactRelationshipsService: EmergencyContactRelationshipsService,
  ) {}

  @Get()
  findAll() {
    return this.emergencyContactRelationshipsService.findAll();
  }
}
