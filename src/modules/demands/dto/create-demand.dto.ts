import {
  IsString,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDemandDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID do paciente',
  })
  @IsUUID()
  @IsNotEmpty()
  patient_id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'UUID do psicólogo responsável',
  })
  @IsUUID()
  @IsNotEmpty()
  psychologist_id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174002',
    description: 'UUID do tema da demanda',
  })
  @IsUUID()
  @IsNotEmpty()
  theme_id: string;

  @ApiProperty({
    example: 'Paciente apresenta crises de ansiedade recorrentes',
    description: 'Descrição específica da demanda',
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  demand_description: string;

  @ApiPropertyOptional({
    example: 'Histórico de ansiedade desde a adolescência',
    description: 'Histórico do problema',
  })
  @IsOptional()
  @IsString()
  problem_history?: string;

  @ApiPropertyOptional({
    example: 'Taquicardia, sudorese, tremores',
    description: 'Sintomas apresentados',
  })
  @IsOptional()
  @IsString()
  symptoms?: string;

  @ApiPropertyOptional({
    example: 'Reduzir frequência das crises de ansiedade',
    description: 'Objetivos do tratamento',
  })
  @IsOptional()
  @IsString()
  treatment_goals?: string;

  @ApiPropertyOptional({
    example: 'Dificuldade em sair de casa, impacto no trabalho',
    description: 'Impacto na vida do paciente',
  })
  @IsOptional()
  @IsString()
  impact_on_life?: string;

  @ApiPropertyOptional({
    example: 'Tentou terapia cognitivo-comportamental há 2 anos',
    description: 'Tentativas anteriores de tratamento',
  })
  @IsOptional()
  @IsString()
  previous_attempts?: string;

  @ApiPropertyOptional({
    example: 'Apoio da família e amigos próximos',
    description: 'Rede de apoio social',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  social_support?: string;

  @ApiPropertyOptional({
    example: 'Estresse no trabalho, falta de sono',
    description: 'Fatores agravantes',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  aggravating_factors?: string;

  @ApiPropertyOptional({
    example: 'Espera aprender técnicas para controlar a ansiedade',
    description: 'Expectativas em relação ao tratamento',
  })
  @IsOptional()
  @IsString()
  treatment_expectations?: string;

  @ApiPropertyOptional({
    example: 'Alta motivação para mudança',
    description: 'Motivação do paciente para mudança',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  motivation_for_change?: string;

  @ApiPropertyOptional({
    example: 'Escitalopram 10mg/dia',
    description: 'Medicação atual',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  current_medication?: string;

  @ApiPropertyOptional({
    example: 'Yoga e meditação',
    description: 'Outras terapias em andamento',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  other_therapies?: string;

  @ApiPropertyOptional({
    example: 'Paciente demonstra grande insight sobre sua condição',
    description: 'Observações adicionais',
  })
  @IsOptional()
  @IsString()
  additional_observations?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID do sentimento atual (feeling)',
  })
  @IsOptional()
  @IsNumber()
  current_feeling_id?: number;

  @ApiPropertyOptional({
    example: 7,
    description: 'Intensidade do sentimento (0-10)',
    minimum: 0,
    maximum: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  feeling_intensity?: number;

  @ApiPropertyOptional({
    example: '2024-03-18T10:00:00Z',
    description: 'Data de início da demanda',
  })
  @IsOptional()
  @IsDateString()
  started_at?: Date;
}
