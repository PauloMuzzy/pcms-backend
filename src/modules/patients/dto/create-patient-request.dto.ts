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
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cpf: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  gender: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  profession: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  emergencyContactName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  emergencyContactPhone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  emergencyContactRelationship: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  active: number;
}
