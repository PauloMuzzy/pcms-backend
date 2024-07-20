import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O campo deve ser uma string' })
  field?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O valor deve ser uma string' })
  value?: string;
}

export class SortDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O campo deve ser uma string' })
  field?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O valor deve ser uma string' })
  @IsEnum(['ASC', 'DESC'], {
    message: 'O valor deve ser ASC ou DESC',
  })
  value?: 'ASC' | 'DESC';
}

export class PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString(
    {},
    { message: 'O número da página deve ser uma string numérica' },
  )
  page?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString(
    {},
    { message: 'O número de itens por página deve ser uma string numérica' },
  )
  itemsPerPage?: string;
}

export class RangeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O campo deve ser uma string' })
  field?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O valor inicial deve ser uma string' })
  start?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O valor final deve ser uma string' })
  end?: string;
}

export class QueryBuilderDto {
  @ApiPropertyOptional({ type: () => [FilterDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters?: FilterDto[];

  @ApiPropertyOptional({ type: () => SortDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SortDto)
  sort?: SortDto;

  @ApiPropertyOptional({ type: () => PaginationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto;

  @ApiPropertyOptional({ type: () => RangeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDto)
  range?: RangeDto;
}
