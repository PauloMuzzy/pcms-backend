import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FindSessionReportsRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID('4')
  uuid?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID('4')
  patient_uuid?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID('4')
  demand_uuid?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID('4')
  psychologist_uuid?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  items_per_page?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sort_field?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sort_direction?: 'ASC' | 'DESC';
}
