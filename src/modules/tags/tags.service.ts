import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find({
      where: { is_active: true },
    });
  }

  async findByPsychologist(psychologistId: string): Promise<Tag[]> {
    return this.tagRepository.find({
      where: { psychologist_id: psychologistId, is_active: true },
    });
  }
}
