import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Sort {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  field?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEnum(['ASC', 'DESC'])
  value?: 'ASC' | 'DESC';
}

export class SortDto {
  @ApiPropertyOptional({ type: Sort })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Sort)
  sort?: Sort;
}
