import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class CreatePatientRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  cpf: string;

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
  @IsNumberString()
  @Length(11, 11)
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  emergencyContactName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Length(11, 11)
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
