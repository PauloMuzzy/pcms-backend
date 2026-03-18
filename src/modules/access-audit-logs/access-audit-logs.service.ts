import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessAuditLog } from './entities/access-audit-log.entity';

@Injectable()
export class AccessAuditLogsService {
  constructor(
    @InjectRepository(AccessAuditLog)
    private readonly accessAuditLogRepository: Repository<AccessAuditLog>,
  ) {}

  async findAll(): Promise<AccessAuditLog[]> {
    return this.accessAuditLogRepository.find({
      relations: ['access_request', 'demand', 'target_psychologist'],
      order: { timestamp: 'DESC' },
    });
  }

  async findByDemand(demandId: string): Promise<AccessAuditLog[]> {
    return this.accessAuditLogRepository.find({
      where: { demand_id: demandId },
      relations: ['access_request', 'demand', 'target_psychologist'],
      order: { timestamp: 'DESC' },
    });
  }
}
