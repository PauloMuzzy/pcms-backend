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
  last_name: string;

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
  date_of_birth: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  gender_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  profession_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Length(11, 11)
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  emergency_contact_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Length(11, 11)
  emergency_contact_phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  emergency_contact_relationship_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  active: number;
}
