import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { formatISODateToYYYYMMDD } from 'src/common/functions/format-date';
import { ValidationService } from 'src/common/services/validation/validation.service';
import { DatabaseService } from 'src/database/database.service';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { FindPatientRequestDto } from 'src/modules/patients/dto/find-patients-request.dto';
import { FindPatientsResponseDto } from 'src/modules/patients/dto/find-patients-response.dto';
import { UpdatePatientRequestDto } from 'src/modules/patients/dto/update-patient-request.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly validationService: ValidationService,
    private readonly dbService: DatabaseService,
    @Inject('UUID') private uuidv4: () => string,
  ) {}

  async create(body: CreatePatientRequestDto): Promise<void> {
    await this.validationService.checkForDuplicates('patients', {
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
      this.uuidv4(),
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

    return await this.dbService.query(SQL, queryParams);
  }

  async update(uuid: string, body: UpdatePatientRequestDto): Promise<void> {
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
      uuid,
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

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJlN2NkMmYzLTJlOTUtMTFlZi1hOTVjLTAyNDJhYzEyMDAwMiIsImlhdCI6MTcyMTc1OTc0NiwiZXhwIjoxNzIxODQ2MTQ2fQ.l1zf08k-Nhf6sJ2splcMPZVwpTXdrHnAvw8wd9gVStQ
