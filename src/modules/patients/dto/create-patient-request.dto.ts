import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
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
  @IsNumberString()
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
  @IsNumberString()
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  profession: string;

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
  @IsNumberString()
  emergencyContactRelationship: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  active: string;
}
