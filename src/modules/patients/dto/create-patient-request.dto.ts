import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreatePatientRequestDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  @Length(1, 500, { message: 'O nome deve ter entre 1 e 500 caracteres' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O sobrenome não pode estar vazio' })
  @IsString({ message: 'O sobrenome deve ser uma string' })
  @Length(1, 500, { message: 'O sobrenome deve ter entre 1 e 500 caracteres' })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O CPF não pode estar vazio' })
  @IsString({ message: 'O CPF deve ser uma string' })
  @Length(11, 11, { message: 'O CPF deve ter 11 caracteres' })
  cpf: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  @IsEmail({}, { message: 'O email deve ser um email válido' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'A data de nascimento não pode estar vazia' })
  @IsDateString(
    {},
    { message: 'A data de nascimento deve ser uma data válida' },
  )
  dateOfBirth: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O gênero não pode estar vazio' })
  @IsString({ message: 'O gênero deve ser uma string' })
  gender: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'A profissão não pode estar vazia' })
  @IsString({ message: 'A profissão deve ser uma string' })
  profession: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  @IsString({ message: 'O telefone deve ser uma string' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'O nome do contato de emergência não pode estar vazio',
  })
  @IsString({ message: 'O nome do contato de emergência deve ser uma string' })
  emergencyContactName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'O telefone do contato de emergência não pode estar vazio',
  })
  @IsString({
    message: 'O telefone do contato de emergência deve ser uma string',
  })
  emergencyContactPhone: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({
    message: 'O parentesco do contato de emergência não pode estar vazio',
  })
  @IsString({
    message: 'O parentesco do contato de emergência deve ser um número',
  })
  emergencyContactRelationship: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'O status ativo não pode estar vazio' })
  @IsString({ message: 'O status ativo deve ser uma string' })
  active: string;
}
