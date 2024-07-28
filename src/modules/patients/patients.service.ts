import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/common/modules/database/database.service';
import { UniqueFieldCheckerService } from 'src/common/modules/unique-field-checker/unique-field-checker.service';
import { UniqueRegisterCheckerService } from 'src/common/modules/unique-register-checker/unique-register-checker.service';
import { UuidService } from 'src/common/modules/uuid/uuid.service';
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { EditPatientRequestDto } from 'src/modules/patients/dto/edit-patient-request.dto';
import { FindPatientsRequestDto } from 'src/modules/patients/dto/find-patients-request.dto';
import { FindPatientsResponseDto } from 'src/modules/patients/dto/find-patients-response.dto';
import { RemovePatientRequestDto } from 'src/modules/patients/dto/remove-patient-request.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly uuidService: UuidService,
    private readonly uniqueFieldCheckerService: UniqueFieldCheckerService,
    private readonly uniqueRegisterCheckerService: UniqueRegisterCheckerService,
  ) {}

  async create(body: CreatePatientRequestDto): Promise<void> {
    const { cpf, email, phone } = body;
    const uuid = await this.uuidService.generate();
    await this.uniqueFieldCheckerService.check({
      tableName: 'patients',
      fields: {
        cpf,
        email,
        phone,
      },
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
      ...Object.values(body),
    ]);

    if (result.affectedRows === 0)
      throw new NotFoundException('Patient not created');
  }

  async find(
    query: FindPatientsRequestDto,
  ): Promise<FindPatientsResponseDto[]> {
    const {
      page = 1,
      items_per_page = 10,
      sort_field,
      sort_direction,
      uuid,
      name,
      cpf,
      email,
      active,
    } = query;
    const where = [];
    const queryParams = [];
    const offset = (Number(page) - 1) * Number(items_per_page);
    const limit = Number(items_per_page);

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
      queryParams.push(uuid);
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

    if (active && Number(active) === 0) {
      where.push(`active = 0`);
    }

    if (where.length > 0) {
      SQL += ' AND ' + where.join(' AND ');
    }

    if (sort_field && sort_direction) {
      SQL += ` ORDER BY ${sort_field} ${sort_direction}`;
    } else {
      SQL += ' ORDER BY created_at DESC';
    }

    SQL += ` LIMIT ${offset}, ${limit}`;

    const result = await this.databaseService.query(SQL, queryParams);
    if (result.length === 0) throw new NotFoundException('No patients found');
    return result;
  }

  async edit(body: EditPatientRequestDto): Promise<void> {
    const { uuid, cpf, email, phone } = body;
    await this.uniqueRegisterCheckerService.check('patients', uuid);
    await this.uniqueFieldCheckerService.check({
      tableName: 'patients',
      fields: {
        cpf,
        email,
        phone,
      },
      uuid,
    });

    const updates = [];
    const params = [];

    for (const [key, value] of Object.entries(body)) {
      if (key !== 'uuid' && value !== undefined) {
        updates.push(`${key} = ?`);
        params.push(value);
      }
    }

    params.push(uuid);

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

  async remove(param: RemovePatientRequestDto): Promise<void> {
    const { uuid } = param;
    await this.uniqueRegisterCheckerService.check('patients', uuid);

    const SQL = `
      DELETE FROM patients WHERE uuid = ? LIMIT 1;
    `;

    const result = await this.databaseService.query(SQL, [uuid]);
    if (result.affectedRows === 0)
      throw new NotFoundException('Patient not found');
  }
}
