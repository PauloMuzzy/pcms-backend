import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePsychologistDto {
  @ApiProperty({
    example: 'João',
    description: 'Primeiro nome do psicólogo',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 'Silva',
    description: 'Sobrenome do psicólogo',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  last_name: string;

  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'Email único do psicólogo',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    example: 'Senha@123',
    description: 'Senha forte (mínimo 8 caracteres)',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  password: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF no formato XXX.XXX.XXX-XX',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF deve estar no formato XXX.XXX.XXX-XX',
  })
  cpf: string;

  @ApiPropertyOptional({
    example: '06/12345',
    description: 'CRP no formato XX/XXXXX',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{2}\/\d{5}$/, {
    message: 'CRP deve estar no formato XX/XXXXX',
  })
  crp?: string;

  @ApiPropertyOptional({
    example: '(11) 98888-8888',
    description: 'Telefone no formato (XX) XXXXX-XXXX',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, {
    message: 'Telefone deve estar no formato (XX) XXXXX-XXXX',
  })
  phone?: string;

  @ApiProperty({
    example: '1990-01-15',
    description: 'Data de nascimento no formato YYYY-MM-DD',
  })
  @IsDateString()
  @IsNotEmpty()
  date_of_birth: Date;

  @ApiPropertyOptional({
    example: true,
    description: 'Status ativo do psicólogo',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
