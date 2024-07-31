import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class EditSessionReportRequestDto {
  @ApiProperty()
  @IsUUID('4')
  uuid: string;

  @ApiProperty({ required: false })
  @IsUUID('4')
  @IsOptional()
  patient_uuid?: string;

  @ApiProperty({ required: false })
  @IsUUID('4')
  @IsOptional()
  demand_uuid?: string;

  @ApiProperty({ required: false })
  @IsUUID('4')
  @IsOptional()
  psychologist_uuid?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  initial_patient_report?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  initial_feeling?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  initial_feeling_level?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  session_notes?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  session_start?: string;

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
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  final_feeling_level?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  next_steps?: string;
}
