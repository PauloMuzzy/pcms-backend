import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyContactRelationship } from './entities/emergency-contact-relationship.entity';

@Injectable()
export class EmergencyContactRelationshipsService {
  constructor(
    @InjectRepository(EmergencyContactRelationship)
    private readonly relationshipRepository: Repository<EmergencyContactRelationship>,
  ) {}

  async findAll(): Promise<EmergencyContactRelationship[]> {
    return this.relationshipRepository.find({
      where: { is_active: true },
    });
  }
}
