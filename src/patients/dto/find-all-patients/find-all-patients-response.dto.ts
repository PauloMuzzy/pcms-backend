import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class FindAllPatientsResponsetDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(11, 11)
  cpf?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(['M', 'F', 'O'])
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  emergencyContactRelationship: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  active: number;
}
