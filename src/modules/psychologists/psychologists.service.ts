import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Psychologist } from './entities/psychologist.entity';
import { CreatePsychologistDto } from './dto/create-psychologist.dto';
import { UpdatePsychologistDto } from './dto/update-psychologist.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PsychologistsService {
  constructor(
    @InjectRepository(Psychologist)
    private readonly psychologistRepository: Repository<Psychologist>,
  ) {}

  async findAll(): Promise<Psychologist[]> {
    return this.psychologistRepository.find({
      where: { is_active: true },
    });
  }

  async findOne(id: string): Promise<Psychologist> {
    const psychologist = await this.psychologistRepository.findOne({
      where: { id, is_active: true },
    });

    if (!psychologist) {
      throw new NotFoundException(`Psychologist with ID ${id} not found`);
    }

    return psychologist;
  }

  async findByEmail(email: string): Promise<Psychologist | null> {
    return this.psychologistRepository.findOne({ where: { email } });
  }

  async findByCpf(cpf: string): Promise<Psychologist | null> {
    return this.psychologistRepository.findOne({ where: { cpf } });
  }

  async create(createPsychologistDto: CreatePsychologistDto): Promise<Psychologist> {
    // Validate email uniqueness
    const existingByEmail = await this.findByEmail(createPsychologistDto.email);
    if (existingByEmail) {
      throw new ConflictException(
        `Psychologist with email ${createPsychologistDto.email} already exists`,
      );
    }

    // Validate CPF uniqueness
    const existingByCpf = await this.findByCpf(createPsychologistDto.cpf);
    if (existingByCpf) {
      throw new ConflictException(
        `Psychologist with CPF ${createPsychologistDto.cpf} already exists`,
      );
    }

    // Validate CRP uniqueness if provided
    if (createPsychologistDto.crp) {
      const existingByCrp = await this.psychologistRepository.findOne({
        where: { crp: createPsychologistDto.crp },
      });
      if (existingByCrp) {
        throw new ConflictException(
          `Psychologist with CRP ${createPsychologistDto.crp} already exists`,
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createPsychologistDto.password, 10);

    const psychologist = this.psychologistRepository.create({
      ...createPsychologistDto,
      password: hashedPassword,
    });

    return this.psychologistRepository.save(psychologist);
  }

  async update(id: string, updatePsychologistDto: UpdatePsychologistDto): Promise<Psychologist> {
    const psychologist = await this.findOne(id);

    // Validate email uniqueness if changing
    if (updatePsychologistDto.email && updatePsychologistDto.email !== psychologist.email) {
      const existingByEmail = await this.findByEmail(updatePsychologistDto.email);
      if (existingByEmail) {
        throw new ConflictException(
          `Psychologist with email ${updatePsychologistDto.email} already exists`,
        );
      }
    }

    // Validate CPF uniqueness if changing
    if (updatePsychologistDto.cpf && updatePsychologistDto.cpf !== psychologist.cpf) {
      const existingByCpf = await this.findByCpf(updatePsychologistDto.cpf);
      if (existingByCpf) {
        throw new ConflictException(
          `Psychologist with CPF ${updatePsychologistDto.cpf} already exists`,
        );
      }
    }

    // Validate CRP uniqueness if changing
    if (updatePsychologistDto.crp && updatePsychologistDto.crp !== psychologist.crp) {
      const existingByCrp = await this.psychologistRepository.findOne({
        where: { crp: updatePsychologistDto.crp },
      });
      if (existingByCrp) {
        throw new ConflictException(
          `Psychologist with CRP ${updatePsychologistDto.crp} already exists`,
        );
      }
    }

    // Hash password if provided
    if (updatePsychologistDto.password) {
      updatePsychologistDto.password = await bcrypt.hash(updatePsychologistDto.password, 10);
    }

    Object.assign(psychologist, updatePsychologistDto);
    return this.psychologistRepository.save(psychologist);
  }

  async delete(id: string): Promise<void> {
    const psychologist = await this.findOne(id);
    await this.psychologistRepository.softDelete(id);
  }
}
