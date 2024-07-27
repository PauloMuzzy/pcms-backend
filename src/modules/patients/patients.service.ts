import { Injectable, NotFoundException } from '@nestjs/common';
import { formatISODateToYYYYMMDD } from 'src/common/functions/format-date';
import { DatabaseService } from 'src/common/modules/database/database.service';
import { UniqueFieldCheckerService } from 'src/common/modules/unique-field-checker/unique-field-checker.service';
import { UniqueRegisterCheckerService } from 'src/common/modules/unique-register-checker/unique-register-checker.service';
import { UuidService } from 'src/common/modules/uuid/uuid.service';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { FindPatientsRequestDto } from 'src/modules/patients/dto/find-patients-request.dto';
import { FindPatientsResponseDto } from 'src/modules/patients/dto/find-patients-response.dto';
import { UpdatePatientRequestDto } from 'src/modules/patients/dto/update-patient-request.dto';
import { FindPatientsQueryModel } from 'src/modules/patients/model/find-patients.model';

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
            last_name, 
            cpf, 
            email, 
            date_of_birth, 
            profession_id, 
            phone, 
            emergency_contact_name, 
            emergency_contact_phone, 
            emergency_contact_relationship_id, 
            gender_id
          )
      VALUES
          (
            ?,?,?,?,?,?,?,?,?,?,?,?
          )`;

    const result = await this.databaseService.query(SQL, [
      uuid,
      body.name,
      body.last_name,
      body.cpf,
      body.email,
      formatISODateToYYYYMMDD(body.date_of_birth),
      body.profession_id,
      body.phone,
      body.emergency_contact_name,
      body.emergency_contact_phone,
      body.emergency_contact_relationship_id,
      body.gender_id,
    ]);
    if (result.affectedRows === 0)
      throw new NotFoundException('Patient not created');
  }

  async find(
    query: FindPatientsRequestDto,
  ): Promise<FindPatientsResponseDto[]> {
    const where = [];
    const queryParams = [];

    const {
      uuid,
      name,
      cpf,
      email,
      active,
      sortField,
      sortDirection,
      page,
      itemsPerPage,
    } = new FindPatientsQueryModel(query);

    let SQL = `
      SELECT 
          uuid,
          name,
          last_name,
          email,
          date_of_birth,
          phone,
          emergency_contact_name,
          emergency_contact_phone,
          active,
          profession_id,
          gender_id,
          emergency_contact_relationship_id
      FROM patients 
      WHERE 1=1
    `;

    if (uuid) {
      where.push(`uuid = ?`);
      queryParams.push(query.uuid);
    }

    if (name) {
      where.push(`name LIKE ?`);
      queryParams.push(`%${name}%`);
    }

    if (cpf) {
      where.push(`cpf = ?`);
      queryParams.push(cpf);
    }

    if (email) {
      where.push(`email = ?`);
      queryParams.push(email);
    }

    if (active && active === 0) {
      where.push(`active = 0`);
    }

    if (where.length > 0) {
      SQL += ' AND ' + where.join(' AND ');
    }

    if (sortField && sortDirection) {
      SQL += ` ORDER BY ${sortField} ${sortDirection}`;
    } else {
      SQL += ' ORDER BY created_at DESC';
    }

    SQL += ` LIMIT ${(page - 1) * itemsPerPage}, ${itemsPerPage}`;

    const result = await this.databaseService.query(SQL, queryParams);
    if (result.length === 0) throw new NotFoundException('No patients found');
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
