import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateDemandRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  patient_uuid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  demand_description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  problem_history?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  symptoms?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  treatment_goals?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  impact_on_life?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  previous_attempts?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  social_support?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  aggravating_factors?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  treatment_expectations?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  motivation_for_change?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  medication?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  other_therapies?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  additional_observations?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  current_feeling_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  feeling_intensity: number;
}
