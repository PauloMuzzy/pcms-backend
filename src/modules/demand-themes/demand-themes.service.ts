import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemandTheme } from './entities/demand-theme.entity';

@Injectable()
export class DemandThemesService {
  constructor(
    @InjectRepository(DemandTheme)
    private readonly demandThemeRepository: Repository<DemandTheme>,
  ) {}

  async findAll(): Promise<DemandTheme[]> {
    return this.demandThemeRepository.find({
      where: { is_active: true },
    });
  }
}
