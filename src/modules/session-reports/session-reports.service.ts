import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionReport } from './entities/session-report.entity';
import { CreateSessionReportDto } from './dto/create-session-report.dto';
import { UpdateSessionReportDto } from './dto/update-session-report.dto';
import { Tag } from '@modules/tags/entities/tag.entity';

@Injectable()
export class SessionReportsService {
  constructor(
    @InjectRepository(SessionReport)
    private readonly sessionReportRepository: Repository<SessionReport>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<SessionReport[]> {
    return this.sessionReportRepository.find({
      relations: ['demand', 'created_by_psychologist', 'tags'],
      order: { session_start: 'DESC' },
    });
  }

  async findOne(id: string): Promise<SessionReport> {
    const report = await this.sessionReportRepository.findOne({
      where: { id },
      relations: ['demand', 'created_by_psychologist', 'tags'],
    });

    if (!report) {
      throw new NotFoundException(`Session Report with ID ${id} not found`);
    }

    return report;
  }

  async findByDemand(demandId: string): Promise<SessionReport[]> {
    return this.sessionReportRepository.find({
      where: { demand_id: demandId },
      relations: ['demand', 'created_by_psychologist', 'tags'],
      order: { session_start: 'DESC' },
    });
  }

  async findByPsychologist(
    psychologistId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: SessionReport[]; meta: any }> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.sessionReportRepository.findAndCount({
      where: { created_by_psychologist_id: psychologistId },
      relations: ['demand', 'created_by_psychologist', 'tags'],
      order: { session_start: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByPatient(
    patientId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: SessionReport[]; meta: any }> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.sessionReportRepository
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.demand', 'demand')
      .leftJoinAndSelect('report.created_by_psychologist', 'psychologist')
      .leftJoinAndSelect('report.tags', 'tags')
      .where('demand.patient_id = :patientId', { patientId })
      .orderBy('report.session_start', 'DESC')
      .skip(skip)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(
    createSessionReportDto: CreateSessionReportDto,
    psychologistId: string,
  ): Promise<SessionReport> {
    // Note: demand_id validation will be handled by database foreign key constraint

    // Calculate duration if session_finish is provided
    let durationMinutes: number | null = null;
    if (createSessionReportDto.session_finish) {
      durationMinutes = this.calculateDuration(
        createSessionReportDto.session_start,
        createSessionReportDto.session_finish,
      );
    }

    // Load tags if provided
    let tags: Tag[] = [];
    if (createSessionReportDto.tag_ids && createSessionReportDto.tag_ids.length > 0) {
      tags = await this.tagRepository.findByIds(createSessionReportDto.tag_ids);

      if (tags.length !== createSessionReportDto.tag_ids.length) {
        throw new BadRequestException('One or more tag IDs are invalid');
      }
    }

    const report = this.sessionReportRepository.create({
      ...createSessionReportDto,
      created_by_psychologist_id: psychologistId,
      duration_minutes: durationMinutes,
      tags,
    });

    return this.sessionReportRepository.save(report);
  }

  async update(
    id: string,
    updateSessionReportDto: UpdateSessionReportDto,
    psychologistId: string,
  ): Promise<SessionReport> {
    const report = await this.findOne(id);

    // Validate permission: only the creator can update
    if (report.created_by_psychologist_id !== psychologistId) {
      throw new ForbiddenException('You can only update session reports that you created');
    }

    // Recalculate duration if dates are being updated
    if (updateSessionReportDto.session_start || updateSessionReportDto.session_finish) {
      const sessionStart = updateSessionReportDto.session_start || report.session_start;
      const sessionFinish = updateSessionReportDto.session_finish || report.session_finish;

      if (sessionFinish) {
        report.duration_minutes = this.calculateDuration(sessionStart, sessionFinish);
      }
    }

    // Update tags if provided
    if (updateSessionReportDto.tag_ids !== undefined) {
      if (updateSessionReportDto.tag_ids.length > 0) {
        const tags = await this.tagRepository.findByIds(updateSessionReportDto.tag_ids);

        if (tags.length !== updateSessionReportDto.tag_ids.length) {
          throw new BadRequestException('One or more tag IDs are invalid');
        }

        report.tags = tags;
      } else {
        report.tags = [];
      }
    }

    // Mark as edited
    report.is_edited = true;

    Object.assign(report, updateSessionReportDto);
    return this.sessionReportRepository.save(report);
  }

  async delete(id: string, psychologistId: string): Promise<void> {
    const report = await this.findOne(id);

    // Validate permission: only the creator can delete
    if (report.created_by_psychologist_id !== psychologistId) {
      throw new ForbiddenException('You can only delete session reports that you created');
    }

    await this.sessionReportRepository.softDelete(id);
  }

  private calculateDuration(start: Date, finish: Date): number {
    const startTime = new Date(start).getTime();
    const finishTime = new Date(finish).getTime();

    if (finishTime <= startTime) {
      throw new BadRequestException('Session finish time must be after start time');
    }

    return Math.floor((finishTime - startTime) / 60000); // Convert milliseconds to minutes
  }
}
