import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsDateString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({
    example: 'Maria',
    description: 'Primeiro nome do paciente',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 'Santos',
    description: 'Sobrenome do paciente',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  last_name: string;

  @ApiProperty({
    example: '987.654.321-00',
    description: 'CPF no formato XXX.XXX.XXX-XX',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF deve estar no formato XXX.XXX.XXX-XX',
  })
  cpf: string;

  @ApiPropertyOptional({
    example: 'maria.santos@example.com',
    description: 'Email do paciente (opcional)',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiProperty({
    example: '1995-05-20',
    description: 'Data de nascimento no formato YYYY-MM-DD',
  })
  @IsDateString()
  @IsNotEmpty()
  date_of_birth: Date;

  @ApiProperty({
    example: 1,
    description: 'ID do gênero',
  })
  @IsNumber()
  @IsNotEmpty()
  gender_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID da profissão',
  })
  @IsNumber()
  @IsNotEmpty()
  profession_id: number;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone no formato (XX) XXXXX-XXXX',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, {
    message: 'Telefone deve estar no formato (XX) XXXXX-XXXX',
  })
  phone: string;

  @ApiProperty({
    example: 'José Santos',
    description: 'Nome do contato de emergência',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  emergency_contact_name: string;

  @ApiProperty({
    example: '(11) 98888-7777',
    description: 'Telefone do contato de emergência',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, {
    message: 'Telefone deve estar no formato (XX) XXXXX-XXXX',
  })
  emergency_contact_phone: string;

  @ApiProperty({
    example: 1,
    description: 'ID do relacionamento com o contato de emergência',
  })
  @IsNumber()
  @IsNotEmpty()
  emergency_contact_relationship_id: number;

  @ApiPropertyOptional({
    example: 'Paciente ansioso, busca ajuda para controlar crises de pânico',
    description: 'Observações gerais sobre o paciente',
  })
  @IsOptional()
  @IsString()
  general_notes?: string;

  @ApiPropertyOptional({
    example: 'Histórico de ansiedade na família',
    description: 'Histórico médico relevante',
  })
  @IsOptional()
  @IsString()
  medical_history?: string;

  @ApiPropertyOptional({
    example: 'Fluoxetina 20mg/dia',
    description: 'Medicações em uso atualmente',
  })
  @IsOptional()
  @IsString()
  medications_in_use?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Status ativo do paciente',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
