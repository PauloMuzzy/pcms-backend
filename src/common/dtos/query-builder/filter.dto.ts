import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class Filter {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  field?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  value?: string;
}

export class FilterDto {
  @ApiPropertyOptional({ type: [Filter] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Filter)
  filters?: Filter[];
}
