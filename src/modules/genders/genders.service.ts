import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GendersService {
  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  async findAll(): Promise<Gender[]> {
    return this.genderRepository.find({
      where: { is_active: true },
    });
  }
}
