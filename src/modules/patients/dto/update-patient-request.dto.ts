import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
export class UpdatePatientRequestDto {
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
  @IsNumberString()
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
  @IsNumberString()
  gender?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  profession?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  @Length(11, 11)
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  emergencyContactName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  @Length(11, 11)
  emergencyContactPhone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  emergencyContactRelationship?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  active?: string;
}
