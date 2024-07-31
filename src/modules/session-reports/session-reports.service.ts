import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/common/modules/database/database.service';
import { RecordAndDuplicationCheckerService } from 'src/common/modules/record-and-duplication-checker/record-and-duplication-checker.service';
import { UuidService } from 'src/common/modules/uuid/uuid.service';
import { CreateSessionReportRequestDto } from 'src/modules/session-reports/dto/create-session-report-request.dto';
import { EditSessionReportRequestDto } from 'src/modules/session-reports/dto/edit-session-report-request.dto';
import { FindSessionReportsRequestDto } from 'src/modules/session-reports/dto/find-session-reports-request.dto';
import { FindSessionReportsResponseDto } from 'src/modules/session-reports/dto/find-session-reports-response.dto';
import { RemoveSessionReportRequestDto } from 'src/modules/session-reports/dto/remove-session-report-request.dto';

@Injectable()
export class SessionReportsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly uuidService: UuidService,
    private readonly recordAndDuplicationCheckerService: RecordAndDuplicationCheckerService,
  ) {}

  async create(body: CreateSessionReportRequestDto): Promise<void> {
    const {
      patient_uuid,
      demand_uuid,
      psychologist_uuid,
      initial_patient_report,
      initial_feeling,
      initial_feeling_level,
      session_notes,
      session_start,
      session_finish,
      tags_ids,
      psychologist_observations,
      final_feeling,
      final_feeling_level,
      next_steps,
    } = body;
    const uuid = await this.uuidService.generate();

    await this.recordAndDuplicationCheckerService.checkRecords([
      {
        tableName: 'patients',
        fieldValue: patient_uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'patient_uuid',
        checkType: 'existence',
      },
      {
        tableName: 'demands',
        fieldValue: demand_uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'demand_uuid',
        checkType: 'existence',
      },
      {
        tableName: 'psychologists',
        fieldValue: psychologist_uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'psychologist_uuid',
        checkType: 'existence',
      },
    ]);

    const SQL = `
      INSERT INTO session_reports (
        uuid,
        patient_uuid,
        demand_uuid,
        psychologist_uuid,
        initial_patient_report,
        initial_feeling,
        initial_feeling_level,
        session_notes,
        session_start,
        session_finish,
        tags_ids,
        psychologist_observations,
        final_feeling,
        final_feeling_level,
        next_steps
        ) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const result = await this.databaseService.query(SQL, [
      uuid,
      patient_uuid,
      demand_uuid,
      psychologist_uuid,
      initial_patient_report,
      initial_feeling,
      initial_feeling_level,
      session_notes,
      session_start,
      session_finish,
      tags_ids,
      psychologist_observations,
      final_feeling,
      final_feeling_level,
      next_steps,
    ]);

    if (result.affectedRows === 0) {
      throw new Error('Failed to create session report');
    }
  }

  async find(
    query: FindSessionReportsRequestDto,
  ): Promise<FindSessionReportsResponseDto[]> {
    const {
      page = 1,
      items_per_page = 10,
      sort_field,
      sort_direction,
      uuid,
      patient_uuid,
      demand_uuid,
      psychologist_uuid,
    } = query;

    await this.recordAndDuplicationCheckerService.checkRecords([
      {
        tableName: 'session_reports',
        fieldValue: uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'uuid',
        checkType: 'existence',
      },
      {
        tableName: 'session_reports',
        fieldValue: patient_uuid,
        fieldName: 'patient_uuid',
        fieldNameResponse: 'patient_uuid',
        checkType: 'existence',
      },
      {
        tableName: 'session_reports',
        fieldValue: demand_uuid,
        fieldName: 'demand_uuid',
        fieldNameResponse: 'demand_uuid',
        checkType: 'existence',
      },
      {
        tableName: 'session_reports',
        fieldValue: psychologist_uuid,
        fieldName: 'psychologist_uuid',
        fieldNameResponse: 'psychologist_uuid',
        checkType: 'existence',
      },
    ]);

    const where = [];
    const queryParams = [];
    const offset = (Number(page) - 1) * Number(items_per_page);
    const limit = Number(items_per_page);

    let SQL = `
      SELECT 
          uuid,
          patient_uuid,
          demand_uuid,
          psychologist_uuid,
          initial_patient_report,
          initial_feeling,
          initial_feeling_level,
          session_notes,
          session_start,
          session_finish,
          tags_ids,
          psychologist_observations,
          final_feeling,
          final_feeling_level,
          next_steps,
          created_at,
          updated_at
      FROM session_reports 
      WHERE 1=1
    `;

    if (uuid) {
      where.push(`uuid = ?`);
      queryParams.push(uuid);
    }

    if (patient_uuid) {
      where.push(`patient_uuid = ?`);
      queryParams.push(patient_uuid);
    }

    if (demand_uuid) {
      where.push(`demand_uuid = ?`);
      queryParams.push(demand_uuid);
    }

    if (psychologist_uuid) {
      where.push(`psychologist_uuid = ?`);
      queryParams.push(psychologist_uuid);
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
    if (result.length === 0)
      throw new NotFoundException('No session reports found');

    return result;
  }

  async edit(body: EditSessionReportRequestDto): Promise<void> {
    const { uuid, patient_uuid, demand_uuid, psychologist_uuid } = body;

    await this.recordAndDuplicationCheckerService.checkRecords([
      {
        tableName: 'session_reports',
        fieldValue: uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'uuid',
        checkType: 'existence',
      },
      {
        tableName: 'patients',
        fieldValue: patient_uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'patient_uuid',
        checkType: 'existence',
      },
      {
        tableName: 'demands',
        fieldValue: demand_uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'demand_uuid',
        checkType: 'existence',
      },
      {
        tableName: 'psychologists',
        fieldValue: psychologist_uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'psychologist_uuid',
        checkType: 'existence',
      },
    ]);

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
      UPDATE session_reports
      SET ${updates.join(', ')}
      WHERE uuid = ?
      LIMIT 1;
    `;

    const result = await this.databaseService.query(SQL, params);

    if (result.changedRows === 0) {
      throw new NotFoundException('Session report not changed');
    }
  }

  async remove(param: RemoveSessionReportRequestDto): Promise<void> {
    const { uuid } = param;

    await this.recordAndDuplicationCheckerService.checkRecords([
      {
        tableName: 'session_reports',
        fieldValue: uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'uuid',
        checkType: 'existence',
      },
    ]);

    const SQL = `
      DELETE FROM session_reports WHERE uuid = ? LIMIT 1;
    `;

    const result = await this.databaseService.query(SQL, [uuid]);

    if (result.affectedRows === 0) {
      throw new NotFoundException('Session report not found');
    }
  }
}
