import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { SearchPatientsDto } from './dto/search-patients.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find({
      where: { is_active: true },
      relations: ['gender', 'profession', 'emergency_contact_relationship'],
    });
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id, is_active: true },
      relations: ['gender', 'profession', 'emergency_contact_relationship'],
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async findByCpf(cpf: string): Promise<Patient | null> {
    return this.patientRepository.findOne({ where: { cpf } });
  }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    // Validate CPF uniqueness
    const existingPatient = await this.findByCpf(createPatientDto.cpf);
    if (existingPatient) {
      throw new ConflictException(`Patient with CPF ${createPatientDto.cpf} already exists`);
    }

    // Note: FK validation (gender_id, profession_id, emergency_contact_relationship_id)
    // is handled by database constraints. If invalid, TypeORM will throw an error.

    const patient = this.patientRepository.create(createPatientDto);
    return this.patientRepository.save(patient);
  }

  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id);

    // Validate CPF uniqueness if changing
    if (updatePatientDto.cpf && updatePatientDto.cpf !== patient.cpf) {
      const existingPatient = await this.findByCpf(updatePatientDto.cpf);
      if (existingPatient) {
        throw new ConflictException(`Patient with CPF ${updatePatientDto.cpf} already exists`);
      }
    }

    Object.assign(patient, updatePatientDto);
    return this.patientRepository.save(patient);
  }

  async delete(id: string): Promise<void> {
    const patient = await this.findOne(id);
    await this.patientRepository.softDelete(id);
  }

  async search(filters: SearchPatientsDto): Promise<{ data: Patient[]; meta: any }> {
    const { name, cpf, email, gender_id, profession_id, is_active, page = 1, limit = 10 } = filters;

    const queryBuilder = this.patientRepository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.gender', 'gender')
      .leftJoinAndSelect('patient.profession', 'profession')
      .leftJoinAndSelect(
        'patient.emergency_contact_relationship',
        'emergency_contact_relationship',
      );

    if (name) {
      queryBuilder.andWhere('(patient.name LIKE :name OR patient.last_name LIKE :name)', {
        name: `%${name}%`,
      });
    }

    if (cpf) {
      queryBuilder.andWhere('patient.cpf = :cpf', { cpf });
    }

    if (email) {
      queryBuilder.andWhere('patient.email = :email', { email });
    }

    if (gender_id !== undefined) {
      queryBuilder.andWhere('patient.gender_id = :gender_id', { gender_id });
    }

    if (profession_id !== undefined) {
      queryBuilder.andWhere('patient.profession_id = :profession_id', { profession_id });
    }

    if (is_active !== undefined) {
      queryBuilder.andWhere('patient.is_active = :is_active', { is_active });
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async restore(id: string): Promise<Patient> {
    await this.patientRepository.restore(id);
    return this.findOne(id);
  }
}
