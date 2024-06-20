import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomException } from 'src/exceptions/custom.exception';
import { DatabaseService } from 'src/modules/database/database.service';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { FindAllPatientsResponseDto } from 'src/modules/patients/dto/find-all-patients-response.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly dbService: DatabaseService,
    @Inject('UUID') private uuidv4: () => string,
  ) {}

  async create(params: CreatePatientRequestDto): Promise<void> {
    const SQL = `
      INSERT INTO 
        patients 
          (
            id,
            name, 
            lastname, 
            cpf, 
            email, 
            dateOfBirth, 
            professionId, 
            phone, 
            emergencyContactName, 
            emergencyContactPhone, 
            emergencyContactRelationshipId, 
            genderId
          )
      VALUES
          (
            ?,?,?,?,?,?,?,?,?,?,?,?
          )`;

    try {
      await this.dbService.query(SQL, [
        this.uuidv4(),
        params.name,
        params.lastName,
        params.cpf,
        params.email,
        params.dateOfBirth,
        params.profession,
        params.phone,
        params.emergencyContactName,
        params.emergencyContactPhone,
        params.emergencyContactRelationship,
        params.gender,
      ]);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.message.includes('cpf')) {
          throw new CustomException(
            'CPF já cadastrado na base de dados',
            'CPF_CONFLICT',
            HttpStatus.CONFLICT,
          );
        } else if (error.message.includes('email')) {
          throw new CustomException(
            'Email já cadastrado na base de dados',
            'EMAIL_CONFLICT',
            HttpStatus.CONFLICT,
          );
        } else {
          throw new CustomException(
            'Registro duplicado na base de dados',
            'REGISTER_CONFLICT',
            HttpStatus.CONFLICT,
          );
        }
      }
    }
  }

  async findAll(): Promise<FindAllPatientsResponseDto[]> {
    const SQL = `
      SELECT 
          p.id,
          p.name,
          p.lastName,
          p.email,
          p.dateOfBirth,
          prof.name AS profession,
          p.phone,
          p.emergencyContactName,
          p.emergencyContactPhone,
          p.active,
          g.name AS gender,
          ecr.name AS emergencyContactRelationship
      FROM patients p
      INNER JOIN genders g ON p.genderId = g.id
      INNER JOIN professions prof ON p.professionId = prof.id
      INNER JOIN emergency_contact_relationships ecr ON p.emergencyContactRelationshipId = ecr.id
      WHERE p.active = 1;
    `;

    const result = await this.dbService.query(SQL);
    if (result.length === 0)
      throw new CustomException(
        'Nenhum paciente encontrado',
        'NOT_FOUND',
        HttpStatus.NOT_FOUND,
      );

    return result;
  }

  async findOne(patientUUID: string): Promise<FindAllPatientsResponseDto> {
    const SQL = `
      SELECT 
          p.id,
          p.name,
          p.lastName,
          p.email,
          p.dateOfBirth,
          prof.name AS profession,
          p.phone,
          p.emergencyContactName,
          p.emergencyContactPhone,
          p.active,
          g.name AS gender,
          ecr.name AS emergencyContactRelationship
      FROM patients p
      INNER JOIN genders g ON p.genderId = g.id
      INNER JOIN professions prof ON p.professionId = prof.id
      INNER JOIN emergency_contact_relationships ecr ON p.emergencyContactRelationshipId = ecr.id
      WHERE p.active = 1 AND p.id = ?;
    `;

    const result = await this.dbService.query(SQL, [patientUUID]);
    if (result.length === 0)
      throw new CustomException(
        'Paciente não encontrado',
        'NOT_FOUND',
        HttpStatus.NOT_FOUND,
      );

    return result[0];
  }

  async updateOne(
    patientUUID: string,
    params: CreatePatientRequestDto,
  ): Promise<void> {
    await this.isPatientRegistered(patientUUID);

    const SQL = `
      UPDATE patients 
      SET 
        name = ?,
        lastname = ?,
        cpf = ?,
        email = ?,
        dateOfBirth = ?,
        genderId = ?,
        professionId = ?,
        phone = ?,
        emergencyContactName = ?,
        emergencyContactPhone = ?,
        emergencyContactRelationshipId = ?
      WHERE id = ?
      LIMIT 1;
    `;

    const result = await this.dbService.query(SQL, [
      params.name,
      params.lastName,
      params.cpf,
      params.email,
      params.dateOfBirth,
      params.gender,
      params.profession,
      params.phone,
      params.emergencyContactName,
      params.emergencyContactPhone,
      params.emergencyContactRelationship,
      patientUUID,
    ]);

    if (result.affectedRows === 0)
      throw new CustomException(
        'Paciente não alterado',
        'NOT_FOUND',
        HttpStatus.NOT_FOUND,
      );
  }

  async isPatientRegistered(patientUUID: string): Promise<void> {
    const SQL = `
      SELECT id FROM patients WHERE id = ?;
    `;

    const result = await this.dbService.query(SQL, [patientUUID]);
    if (result.length === 0) {
      throw new CustomException(
        'Paciente não encontrado',
        'NOT_FOUND',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
