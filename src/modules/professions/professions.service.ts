import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profession } from './entities/profession.entity';

@Injectable()
export class ProfessionsService {
  constructor(
    @InjectRepository(Profession)
    private readonly professionRepository: Repository<Profession>,
  ) {}

  async findAll(): Promise<Profession[]> {
    return this.professionRepository.find({
      where: { is_active: true },
    });
  }
}
