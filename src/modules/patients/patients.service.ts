import { Injectable, NotFoundException } from '@nestjs/common';
import { formatISODateToYYYYMMDD } from 'src/common/functions/format-date';
import { DatabaseService } from 'src/common/modules/database/database.service';
import { UniqueFieldCheckerService } from 'src/common/modules/unique-field-checker/unique-field-checker.service';
import { UniqueRegisterCheckerService } from 'src/common/modules/unique-register-checker/unique-register-checker.service';
import { UuidService } from 'src/common/modules/uuid/uuid.service';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { FindPatientRequestDto } from 'src/modules/patients/dto/find-patients-request.dto';
import { FindPatientsResponseDto } from 'src/modules/patients/dto/find-patients-response.dto';
import { UpdatePatientRequestDto } from 'src/modules/patients/dto/update-patient-request.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly uuidService: UuidService,
    private readonly uniqueFieldCheckerService: UniqueFieldCheckerService,
    private readonly uniqueRegisterCheckerService: UniqueRegisterCheckerService,
  ) {}

  async create(body: CreatePatientRequestDto): Promise<void> {
    const uuid = await this.uuidService.generate();
    await this.uniqueFieldCheckerService.check({
      tableName: 'patients',
      fields: {
        cpf: body.cpf,
        email: body.email,
        phone: body.phone,
      },
      uuid: uuid,
    });

    const SQL = `
      INSERT INTO 
        patients
          (
            uuid,
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

    await this.databaseService.query(SQL, [
      uuid,
      body.name,
      body.lastName,
      body.cpf,
      body.email,
      formatISODateToYYYYMMDD(body.dateOfBirth),
      body.profession,
      body.phone,
      body.emergencyContactName,
      body.emergencyContactPhone,
      body.emergencyContactRelationship,
      body.gender,
    ]);
  }

  async find(query: FindPatientRequestDto): Promise<FindPatientsResponseDto[]> {
    const where = [];
    const queryParams = [];
    const itemsPerPage = Number(query.itemsPerPage) || 10;
    const pageNumber = Number(query.page) || 1;
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

    if (query.uuid) {
      where.push(`p.uuid = ?`);
      queryParams.push(query.uuid);
    }

    if (query.name) {
      where.push(`p.name LIKE ?`);
      queryParams.push(`%${query.name}%`);
    }

    if (query.cpf) {
      where.push(`p.cpf = ?`);
      queryParams.push(query.cpf);
    }

    if (query.email) {
      where.push(`p.email = ?`);
      queryParams.push(query.email);
    }

    if (query.active && query.active === '0') {
      where.push(`p.active = 0`);
    }

    if (where.length > 0) {
      SQL += ' AND ' + where.join(' AND ');
    }

    if (query.sortField && query.sortDirection) {
      SQL += ` ORDER BY ${query.sortField} ${query.sortDirection}`;
    } else {
      SQL += ' ORDER BY CreatedAt DESC';
    }

    SQL += ` LIMIT ${offset}, ${itemsPerPage}`;

    const result = await this.databaseService.query(SQL, queryParams);
    if (result.length === 0) throw new NotFoundException();
    return result;
  }

  async edit(body: UpdatePatientRequestDto): Promise<void> {
    await this.uniqueRegisterCheckerService.check('patients', body.uuid);
    await this.uniqueFieldCheckerService.check({
      tableName: 'patients',
      fields: {
        cpf: body.cpf,
        email: body.email,
        phone: body.phone,
      },
      uuid: body.uuid,
    });

    const updates = [];
    const params = [];

    for (const [key, value] of Object.entries(body)) {
      if (key !== 'uuid' && value !== undefined) {
        updates.push(`${key} = ?`);
        params.push(value);
      }
    }

    params.push(body.uuid);

    const SQL = `
      UPDATE patients
      SET ${updates.join(', ')}
      WHERE uuid = ?
      LIMIT 1;
    `;

    const result = await this.databaseService.query(SQL, params);

    if (result.changedRows === 0) {
      throw new NotFoundException('Patient not changed');
    }
  }

  async remove(uuid: string): Promise<void> {
    await this.uniqueRegisterCheckerService.check('patients', uuid);

    const SQL = `
      DELETE FROM patients WHERE uuid = ? LIMIT 1;
    `;

    const result = await this.databaseService.query(SQL, [uuid]);
    if (result.affectedRows === 0)
      throw new NotFoundException('Patient not found');
  }
}
