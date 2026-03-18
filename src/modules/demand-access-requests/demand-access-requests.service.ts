import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemandAccessRequest } from './entities/demand-access-request.entity';

@Injectable()
export class DemandAccessRequestsService {
  constructor(
    @InjectRepository(DemandAccessRequest)
    private readonly demandAccessRequestRepository: Repository<DemandAccessRequest>,
  ) {}

  async findAll(): Promise<DemandAccessRequest[]> {
    return this.demandAccessRequestRepository.find({
      relations: ['demand', 'requesting_psychologist'],
      order: { created_at: 'DESC' },
    });
  }

  async findByDemand(demandId: string): Promise<DemandAccessRequest[]> {
    return this.demandAccessRequestRepository.find({
      where: { demand_id: demandId },
      relations: ['demand', 'requesting_psychologist'],
      order: { created_at: 'DESC' },
    });
  }
}
