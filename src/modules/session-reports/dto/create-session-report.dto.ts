import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsDateString,
  IsNumber,
  Min,
  Max,
  IsArray,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSessionReportDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID da demanda',
  })
  @IsUUID()
  @IsNotEmpty()
  demand_id: string;

  @ApiProperty({
    example: '2024-03-18T14:00:00Z',
    description: 'Data e hora de início da sessão',
  })
  @IsDateString()
  @IsNotEmpty()
  session_start: Date;

  @ApiPropertyOptional({
    example: '2024-03-18T15:00:00Z',
    description: 'Data e hora de término da sessão',
  })
  @IsOptional()
  @IsDateString()
  session_finish?: Date;

  @ApiProperty({
    example: 'Paciente relatou melhora nos sintomas de ansiedade...',
    description: 'Notas principais da sessão',
  })
  @IsString()
  @IsNotEmpty()
  session_notes: string;

  @ApiPropertyOptional({
    example: 'Paciente chegou ansioso, relatando dificuldades no trabalho',
    description: 'Relato inicial do paciente',
  })
  @IsOptional()
  @IsString()
  initial_patient_report?: string;

  @ApiPropertyOptional({
    example: 'Ansioso',
    description: 'Sentimento inicial do paciente',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  initial_feeling?: string;

  @ApiPropertyOptional({
    example: 7,
    description: 'Nível do sentimento inicial (0-10)',
    minimum: 0,
    maximum: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  initial_feeling_level?: number;

  @ApiPropertyOptional({
    example: 'TCC, técnicas de respiração',
    description: 'Técnicas utilizadas na sessão',
  })
  @IsOptional()
  @IsString()
  techniques_used?: string;

  @ApiPropertyOptional({
    example: 'Paciente demonstrou mais tranquilidade ao longo da sessão',
    description: 'Humor observado durante a sessão',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  patient_mood?: string;

  @ApiPropertyOptional({
    example: 'Paciente demonstra boa adesão ao tratamento',
    description: 'Observações do psicólogo',
  })
  @IsOptional()
  @IsString()
  psychologist_observations?: string;

  @ApiPropertyOptional({
    example: 'Progressão positiva em relação à sessão anterior',
    description: 'Notas sobre a evolução do paciente',
  })
  @IsOptional()
  @IsString()
  progress_notes?: string;

  @ApiPropertyOptional({
    example: 'Calmo',
    description: 'Sentimento final do paciente',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  final_feeling?: string;

  @ApiPropertyOptional({
    example: 4,
    description: 'Nível do sentimento final (0-10)',
    minimum: 0,
    maximum: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  final_feeling_level?: number;

  @ApiPropertyOptional({
    example: 'Praticar técnicas de respiração diariamente',
    description: 'Próximos passos planejados',
  })
  @IsOptional()
  @IsString()
  next_steps?: string;

  @ApiPropertyOptional({
    example: ['123e4567-e89b-12d3-a456-426614174001'],
    description: 'Array de UUIDs das tags',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  tag_ids?: string[];
}
