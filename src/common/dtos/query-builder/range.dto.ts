import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class Range {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  field?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  start?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  end?: string;
}

export class RangeDto {
  @ApiPropertyOptional({ type: Range })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Range)
  range?: Range;
}
