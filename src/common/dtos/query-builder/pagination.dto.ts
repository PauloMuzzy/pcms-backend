import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class Pagination {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  itemsPerPage?: string;
}

export class PaginationDto {
  @ApiPropertyOptional({ type: Pagination })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Pagination)
  pagination?: Pagination;
}
