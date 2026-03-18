import { IsString, IsOptional, IsNumber, IsBoolean, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchPatientsDto {
  @ApiPropertyOptional({
    example: 'Maria',
    description: 'Buscar por nome (parcial)',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '987.654.321-00',
    description: 'Buscar por CPF',
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiPropertyOptional({
    example: 'maria@example.com',
    description: 'Buscar por email',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Filtrar por ID do gênero',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gender_id?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Filtrar por ID da profissão',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  profession_id?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Filtrar por status ativo',
    default: true,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página',
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantidade de registros por página',
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
