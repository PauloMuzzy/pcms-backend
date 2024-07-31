import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/common/modules/database/database.service';
import { RecordAndDuplicationCheckerService } from 'src/common/modules/record-and-duplication-checker/record-and-duplication-checker.service';
import { UuidService } from 'src/common/modules/uuid/uuid.service';
import { CreateDemandRequestDto } from 'src/modules/demands/dto/create-demand-request.dto';
import { EditDemandRequestDto } from 'src/modules/demands/dto/edit-demand-request.dto';
import { FindDemandResponseDto } from 'src/modules/demands/dto/find-demand-response.dto';
import { FindDemandsRequestDto } from 'src/modules/demands/dto/find-demands-request.dto';
import { RemovePatientRequestDto } from 'src/modules/demands/dto/remove-demand-request.dto';

@Injectable()
export class DemandsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly uuidService: UuidService,
    private readonly recordAndDuplicationCheckerService: RecordAndDuplicationCheckerService,
  ) {}

  async create(body: CreateDemandRequestDto): Promise<void> {
    const uuid = await this.uuidService.generate();

    const {
      patient_uuid,
      demand_description,
      problem_history,
      symptoms,
      treatment_goals,
      impact_on_life,
      previous_attempts,
      social_support,
      aggravating_factors,
      treatment_expectations,
      motivation_for_change,
      medication,
      other_therapies,
      additional_observations,
      current_feeling_id,
      feeling_intensity,
    } = body;

    await this.recordAndDuplicationCheckerService.checkRecords([
      {
        tableName: 'patients',
        fieldValue: patient_uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'patient_uuid',
        checkType: 'existence',
      },
    ]);

    const SQL = `
      INSERT INTO demands (
        uuid,
        patient_uuid,
        demand_description,
        problem_history,
        symptoms,
        treatment_goals,
        impact_on_life,
        previous_attempts,
        social_support,
        aggravating_factors,
        treatment_expectations,
        motivation_for_change,
        medication,
        other_therapies,
        additional_observations,
        current_feeling_id,
        feeling_intensity
    ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    );`;

    const result = await this.databaseService.query(SQL, [
      uuid,
      patient_uuid,
      demand_description,
      problem_history,
      symptoms,
      treatment_goals,
      impact_on_life,
      previous_attempts,
      social_support,
      aggravating_factors,
      treatment_expectations,
      motivation_for_change,
      medication,
      other_therapies,
      additional_observations,
      current_feeling_id,
      feeling_intensity,
    ]);

    if (result.affectedRows === 0) {
      throw new Error('Demand not created');
    }
  }

  async find(query: FindDemandsRequestDto): Promise<FindDemandResponseDto[]> {
    const where = [];
    const queryParams = [];
    const {
      uuid,
      patient_uuid,
      sort_field,
      sort_direction,
      page,
      items_per_page,
    } = query;

    const offset = (Number(page) - 1) * Number(items_per_page) || 0;
    const limit = Number(items_per_page) || 10;

    let SQL = `
      SELECT 
          uuid,
          patient_uuid,
          demand_description,
          problem_history,
          symptoms,
          treatment_goals,
          impact_on_life,
          previous_attempts,
          social_support,
          aggravating_factors,
          treatment_expectations,
          motivation_for_change,
          medication,
          other_therapies,
          additional_observations,
          current_feeling_id,
          feeling_intensity,
          created_at
      FROM 
          demands
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
    if (result.length === 0) throw new NotFoundException('Demand not found');
    return result;
  }

  async edit(body: EditDemandRequestDto): Promise<void> {
    const { uuid } = body;

    await this.recordAndDuplicationCheckerService.checkRecords([
      {
        tableName: 'demands',
        fieldValue: uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'uuid',
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
      UPDATE demands
      SET ${updates.join(', ')}
      WHERE uuid = ?
      LIMIT 1;
    `;

    const result = await this.databaseService.query(SQL, params);

    if (result.changedRows === 0) {
      throw new NotFoundException('Demand not changed');
    }
  }

  async remove(param: RemovePatientRequestDto): Promise<void> {
    const { uuid } = param;

    await this.recordAndDuplicationCheckerService.checkRecords([
      {
        tableName: 'demands',
        fieldValue: uuid,
        fieldName: 'uuid',
        fieldNameResponse: 'uuid',
        checkType: 'existence',
      },
    ]);

    const SQL = `
      DELETE FROM demands WHERE uuid = ? LIMIT 1;
    `;

    const result = await this.databaseService.query(SQL, [uuid]);
    if (result.affectedRows === 0)
      throw new NotFoundException('Demand not removed');
  }
}
