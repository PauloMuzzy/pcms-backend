import { ApiProperty } from '@nestjs/swagger';

export class FindDemandResponseDto {
  @ApiProperty()
  patient_uuid: string;

  @ApiProperty()
  demand_description: string;

  @ApiProperty()
  problem_history: string;

  @ApiProperty()
  symptoms: string;

  @ApiProperty()
  treatment_goals: string;

  @ApiProperty()
  impact_on_life: string;

  @ApiProperty()
  previous_attempts: string;

  @ApiProperty()
  social_support: string;

  @ApiProperty()
  aggravating_factors: string;

  @ApiProperty()
  treatment_expectations: string;

  @ApiProperty()
  motivation_for_change: string;

  @ApiProperty()
  medication: string;

  @ApiProperty()
  other_therapies: string;

  @ApiProperty()
  additional_observations: string;

  @ApiProperty()
  current_feeling_id: number;

  @ApiProperty()
  feeling_intensity: number;

  @ApiProperty()
  created_at: string;
}
