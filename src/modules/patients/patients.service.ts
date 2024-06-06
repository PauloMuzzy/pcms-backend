import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient/create-patient-request.dto';
import { FindAllPatientsResponsetDto } from 'src/modules/patients/dto/find-all-patients/find-all-patients-response.dto';
import { Patient } from 'src/modules/patients/entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async create(params: CreatePatientRequestDto) {
    const patient = new Patient();
    patient.name = params.name;
    patient.lastName = params.lastName;
    patient.cpf = params.cpf;
    patient.email = params.email;
    patient.dateOfBirth = new Date(params.dateOfBirth);
    patient.age = params.age;
    patient.gender = params.gender;
    patient.profession = params.profession;
    patient.phone = params.phone;
    patient.emergencyContactName = params.emergencyContactName;
    patient.emergencyContactPhone = params.emergencyContactPhone;
    patient.emergencyContactRelationship = params.emergencyContactRelationship;
    patient.active = 1;
    patient.createdAt = new Date();
    patient.updatedAt = new Date();

    const createdPatient = await this.patientsRepository.save(patient);
  }

  async findAll(): Promise<FindAllPatientsResponsetDto[]> {
    const users = await this.patientsRepository.find({
      select: [
        'id',
        'name',
        'lastName',
        'cpf',
        'email',
        'dateOfBirth',
        'age',
        'gender',
        'profession',
        'phone',
        'emergencyContactName',
        'emergencyContactPhone',
        'emergencyContactRelationship',
        'active',
      ],
    });

    return users.map((user) => {
      const patients = new FindAllPatientsResponsetDto();
      patients.id = user.id;
      patients.name = user.name;
      patients.lastName = user.lastName;
      patients.cpf = user.cpf;
      patients.email = user.email;
      patients.dateOfBirth = user.dateOfBirth;
      patients.age = user.age;
      patients.gender = user.gender;
      patients.profession = user.profession;
      patients.phone = user.phone;
      patients.emergencyContactName = user.emergencyContactName;
      patients.emergencyContactPhone = user.emergencyContactPhone;
      patients.emergencyContactRelationship = user.emergencyContactRelationship;
      patients.active = user.active;
      return patients;
    });
  }
}
