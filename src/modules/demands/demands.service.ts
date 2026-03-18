import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demand } from './entities/demand.entity';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { UpdateDemandStatusDto } from './dto/update-demand-status.dto';

@Injectable()
export class DemandsService {
  constructor(
    @InjectRepository(Demand)
    private readonly demandRepository: Repository<Demand>,
  ) {}

  async findAll(status?: string): Promise<Demand[]> {
    const where: any = {};
    if (status) {
      where.status = status;
    }

    return this.demandRepository.find({
      where,
      relations: ['patient', 'psychologist', 'theme'],
    });
  }

  async findOne(id: string): Promise<Demand> {
    const demand = await this.demandRepository.findOne({
      where: { id },
      relations: ['patient', 'psychologist', 'theme'],
    });

    if (!demand) {
      throw new NotFoundException(`Demand with ID ${id} not found`);
    }

    return demand;
  }

  async findByPatient(patientId: string): Promise<Demand[]> {
    return this.demandRepository.find({
      where: { patient_id: patientId },
      relations: ['patient', 'psychologist', 'theme'],
      order: { created_at: 'DESC' },
    });
  }

  async findByPsychologist(psychologistId: string): Promise<Demand[]> {
    return this.demandRepository.find({
      where: { psychologist_id: psychologistId },
      relations: ['patient', 'psychologist', 'theme'],
      order: { created_at: 'DESC' },
    });
  }

  async findByTheme(themeId: string): Promise<Demand[]> {
    return this.demandRepository.find({
      where: { theme_id: themeId },
      relations: ['patient', 'psychologist', 'theme'],
      order: { created_at: 'DESC' },
    });
  }

  async create(createDemandDto: CreateDemandDto): Promise<Demand> {
    // Note: Foreign key validation (patient_id, psychologist_id, theme_id) will be handled by database constraints
    // Optionally, you can add explicit validation here by fetching the related entities

    const demand = this.demandRepository.create({
      ...createDemandDto,
      status: 'active',
      started_at: createDemandDto.started_at || new Date(),
    });

    return this.demandRepository.save(demand);
  }

  async update(id: string, updateDemandDto: UpdateDemandDto): Promise<Demand> {
    const demand = await this.findOne(id);

    // Note: Status changes should be done via updateStatus() method
    Object.assign(demand, updateDemandDto);
    return this.demandRepository.save(demand);
  }

  async updateStatus(id: string, updateStatusDto: UpdateDemandStatusDto): Promise<Demand> {
    const demand = await this.findOne(id);

    this.validateStatusTransition(demand.status, updateStatusDto.status);

    demand.status = updateStatusDto.status;

    if (updateStatusDto.status === 'completed') {
      demand.completed_at = new Date();
    }

    return this.demandRepository.save(demand);
  }

  async delete(id: string): Promise<void> {
    const demand = await this.findOne(id);

    // Prevent deletion of demands that are in progress
    if (demand.status === 'in_progress') {
      throw new BadRequestException(
        'Cannot delete a demand that is currently in progress. Please pause or complete it first.',
      );
    }

    await this.demandRepository.softDelete(id);
  }

  private validateStatusTransition(currentStatus: string, newStatus: string): void {
    const validTransitions: Record<string, string[]> = {
      active: ['in_progress', 'transferred'],
      in_progress: ['paused', 'completed', 'transferred'],
      paused: ['in_progress', 'completed', 'transferred'],
      completed: [], // Cannot transition from completed
      transferred: [], // Cannot transition from transferred
    };

    const allowedNextStatuses = validTransitions[currentStatus] || [];

    if (!allowedNextStatuses.includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition from '${currentStatus}' to '${newStatus}'. ` +
          `Allowed transitions: ${allowedNextStatuses.length > 0 ? allowedNextStatuses.join(', ') : 'none'}`,
      );
    }
  }
}
