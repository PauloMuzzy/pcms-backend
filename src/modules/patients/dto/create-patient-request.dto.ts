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
  @IsString()
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  profession: string;

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

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsString()
  emergencyContactRelationship: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsString()
  active: string;
}
