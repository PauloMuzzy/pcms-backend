import { Injectable, NotFoundException } from '@nestjs/common';
import { formatISODateToYYYYMMDD } from 'src/common/functions/format-date';
import { DuplicateDetectorService } from 'src/common/modules/duplicate-detector/duplicate-detector.service';
import { UuidService } from 'src/common/modules/uuid/uuid.service';
import { DatabaseService } from 'src/database/database.service';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { FindPatientRequestDto } from 'src/modules/patients/dto/find-patients-request.dto';
import { FindPatientsResponseDto } from 'src/modules/patients/dto/find-patients-response.dto';
import { UpdatePatientRequestDto } from 'src/modules/patients/dto/update-patient-request.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly duplicateDetectorService: DuplicateDetectorService,
    private readonly dbService: DatabaseService,
    private readonly uuidService: UuidService,
  ) {}

  async create(body: CreatePatientRequestDto): Promise<void> {
    await this.duplicateDetectorService.checkForDuplicates('patients', {
      cpf: body.cpf,
      email: body.email,
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

    await this.dbService.query(SQL, [
      this.uuidService.generate(),
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

    if (query.active && query.active === 0) {
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

    return await this.dbService.query(SQL, queryParams);
  }

  async update(body: UpdatePatientRequestDto): Promise<void> {
    await this.isPatientRegistered(body.uuid);

    await this.duplicateDetectorService.checkForDuplicates('patients', {
      cpf: body.cpf,
      email: body.email,
    });

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
        emergencyContactRelationshipId = ?,
        active = ?
      WHERE uuid = ?
      LIMIT 1;
    `;

    const result = await this.dbService.query(SQL, [
      body.name,
      body.lastName,
      body.cpf,
      body.email,
      body.dateOfBirth,
      body.gender,
      body.profession,
      body.phone,
      body.emergencyContactName,
      body.emergencyContactPhone,
      body.emergencyContactRelationship,
      body.active,
      body.uuid,
    ]);

    if (result.affectedRows === 0) throw new NotFoundException();
  }

  async delete(uuid: string): Promise<void> {
    await this.isPatientRegistered(uuid);

    const SQL = `
      DELETE FROM patients WHERE uuid = ? LIMIT 1;
    `;

    const result = await this.dbService.query(SQL, [uuid]);
    if (result.affectedRows === 0) throw new NotFoundException();
  }

  async isPatientRegistered(uuid: string): Promise<void> {
    const result = await this.dbService.query(
      'SELECT uuid FROM patients WHERE uuid = ?;',
      [uuid],
    );
    if (result.length === 0) throw new NotFoundException();
  }
}
