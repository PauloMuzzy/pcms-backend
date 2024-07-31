import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateSessionReportRequestDto {
  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  patient_uuid: string;

  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  demand_uuid: string;

  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  psychologist_uuid: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  initial_patient_report?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  initial_feeling?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @Min(0)
  @Max(10)
  @IsOptional()
  initial_feeling_level?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  session_notes: string;

  @IsDateString()
  @IsNotEmpty()
  session_start: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  session_finish?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tags_ids?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  psychologist_observations?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  final_feeling?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @Min(0)
  @Max(10)
  @IsOptional()
  final_feeling_level?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  next_steps?: string;
}
