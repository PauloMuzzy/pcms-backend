import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomException } from 'src/common/exceptions/custom.exception';
import { formatISODateToYYYYMMDD } from 'src/common/functions/format-date';
import { ValidationService } from 'src/common/services/validation/validation.service';
import { DatabaseService } from 'src/database/database.service';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly validationService: ValidationService,
    private readonly dbService: DatabaseService,
    @Inject('UUID') private uuidv4: () => string,
  ) {}

  async isPatientRegistered(uuid: string): Promise<void> {
    const SQL = `
      SELECT id FROM patients WHERE id = ?;
    `;

    const result = await this.dbService.query(SQL, [uuid]);
    if (result.length === 0) {
      throw new CustomException(
        'Paciente não encontrado',
        'NOT_FOUND',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(params: CreatePatientRequestDto): Promise<void> {
    await this.validationService.checkForDuplicates('patients', {
      cpf: params.cpf,
      email: params.email,
    });

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

    await this.dbService.query(SQL, [
      this.uuidv4(),
      params.name,
      params.lastName,
      params.cpf,
      params.email,
      formatISODateToYYYYMMDD(params.dateOfBirth),
      params.profession,
      params.phone,
      params.emergencyContactName,
      params.emergencyContactPhone,
      params.emergencyContactRelationship,
      params.gender,
    ]);
  }

  async update(uuid: string, params: CreatePatientRequestDto): Promise<void> {
    await this.isPatientRegistered(uuid);

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
        active = ?
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
      params.active,
      uuid,
    ]);

    if (result.affectedRows === 0)
      throw new CustomException(
        'Paciente não alterado',
        'NOT_FOUND',
        HttpStatus.NOT_FOUND,
      );
  }

  async delete(uuid: string): Promise<void> {
    await this.isPatientRegistered(uuid);

    const SQL = `
      DELETE FROM patients WHERE id = ? LIMIT 1;
    `;

    const result = await this.dbService.query(SQL, [uuid]);
    if (result.affectedRows === 0)
      throw new CustomException(
        'Paciente não excluído',
        'NOT_FOUND',
        HttpStatus.NOT_FOUND,
      );
  }

  async find(parameters: any) {
    const where = [];
    const queryParams = [];
    const itemsPerPage = parameters.itemsPerPage || 10;
    const pageNumber = parameters.page || 1;
    const offset = (pageNumber - 1) * itemsPerPage;

    let SQL = `
    SELECT 
        p.uuid,
        p.name,
        p.lastName,
        p.email,
        p.dateOfBirth,
        p.phone,
        p.emergencyContactName,
        p.emergencyContactPhone,
        p.active,
        prof.name AS profession,
        g.name AS gender,
        ecr.name AS emergencyContactRelationship
    FROM patients p
    INNER JOIN genders g ON p.genderId = g.id
    INNER JOIN professions prof ON p.professionId = prof.id
    INNER JOIN emergency_contact_relationships ecr ON p.emergencyContactRelationshipId = ecr.id
    WHERE 1=1
    `;

    if (parameters.uuid) {
      where.push(`p.uuid = ?`);
      queryParams.push(parameters.uuid);
    }

    if (parameters.name) {
      where.push(`p.name LIKE ?`);
      queryParams.push(`%${parameters.name}%`);
    }

    if (parameters.cpf) {
      where.push(`p.cpf = ?`);
      queryParams.push(parameters.cpf);
    }

    if (parameters.email) {
      where.push(`p.email = ?`);
      queryParams.push(parameters.email);
    }

    if (parameters.active && parameters.active === '0') {
      where.push(`p.active = 0`);
    }

    if (where.length > 0) {
      SQL += ' AND ' + where.join(' AND ');
    }

    if (parameters.sortField && parameters.sortDirection) {
      SQL += ` ORDER BY ${parameters.sortField} ${parameters.sortDirection}`;
    }

    SQL += ` LIMIT ${offset}, ${itemsPerPage}`;

    const result = await this.dbService.query(SQL, queryParams);
    return result;
  }
}
