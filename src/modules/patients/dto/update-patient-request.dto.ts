import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
export class UpdatePatientRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  uuid?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(11, 11)
  cpf?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  gender?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  profession?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(11, 11)
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  emergencyContactName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(11, 11)
  emergencyContactPhone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  emergencyContactRelationship?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  active?: number;
}
