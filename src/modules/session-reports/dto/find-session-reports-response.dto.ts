import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';

export class FindSessionReportsResponseDto {
  @ApiProperty()
  @IsUUID('4')
  uuid: string;

  @ApiProperty()
  @IsUUID('4')
  patient_uuid: string;

  @ApiProperty()
  @IsUUID('4')
  demand_uuid: string;

  @ApiProperty()
  @IsUUID('4')
  psychologist_uuid: string;

  @ApiProperty()
  @IsString()
  initial_patient_report: string;

  @ApiProperty()
  @IsString()
  initial_feeling: string;

  @ApiProperty()
  @IsNumber()
  initial_feeling_level: number;

  @ApiProperty()
  @IsString()
  session_notes: string;

  @ApiProperty()
  @IsDateString()
  session_start: string;

  @ApiProperty()
  @IsDateString()
  session_finish: string;

  @ApiProperty()
  @IsString()
  tags_ids: string;

  @ApiProperty()
  @IsString()
  psychologist_observations: string;

  @ApiProperty()
  @IsString()
  final_feeling: string;

  @ApiProperty()
  @IsNumber()
  final_feeling_level: number;

  @ApiProperty()
  @IsString()
  next_steps: string;

  @ApiProperty()
  @IsDateString()
  created_at: string;

  @ApiProperty()
  @IsDateString()
  updated_at: string;
}
