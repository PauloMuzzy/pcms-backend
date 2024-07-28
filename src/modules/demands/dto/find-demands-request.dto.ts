import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FindDemandsRequestDto {
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
  @IsString()
  @IsIn(['created_at'])
  sort_field?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sort_direction?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  @IsIn(['10', '20', '50'])
  items_per_page?: string;
}
