import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreatePatientRequestDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString({ message: 'Nome deve ser uma string' })
  @Length(1, 500, { message: 'Nome deve ter entre 1 e 500 caracteres' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Sobrenome não pode ser vazio' })
  @IsString({ message: 'Sobrenome deve ser uma string' })
  @Length(1, 500, { message: 'Sobrenome deve ter entre 1 e 500 caracteres' })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'CPF não pode ser vazio' })
  @IsNumber({}, { message: 'CPF deve ser um número' })
  @Length(11, 11, { message: 'CPF deve ter 11 caracteres' })
  cpf: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail({}, { message: 'Email deve ser um email válido' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Data de nascimento não pode ser vazia' })
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida' })
  dateOfBirth: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Gênero não pode ser vazio' })
  @IsNumber({}, { message: 'Gênero deve ser um número' })
  gender: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Profissão não pode ser vazia' })
  @IsNumber({}, { message: 'Profissão deve ser um número' })
  profession: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Endereço não pode ser vazio' })
  @IsString({ message: 'Endereço deve ser uma string' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'CEP não pode ser vazio' })
  @IsString({ message: 'CEP deve ser uma string' })
  emergencyContactName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Telefone do contato de emergência não pode ser vazio',
  })
  @IsString({
    message: 'Telefone do contato de emergência deve ser uma string',
  })
  emergencyContactPhone: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({
    message: 'Parentesco do contato de emergência não pode ser vazio',
  })
  @IsNumber(
    {},
    { message: 'Parentesco do contato de emergência deve ser um número' },
  )
  emergencyContactRelationship: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'CEP não pode ser vazio' })
  @IsNumber({}, { message: 'CEP deve ser um número' })
  active: number;
}
