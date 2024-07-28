import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreatePsychologistRequestDto {
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
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsIn([1, 2])
  access_type_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  date_of_birth: string;
}
