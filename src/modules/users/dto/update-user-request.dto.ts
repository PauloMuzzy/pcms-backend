import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  uuid: string;

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
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(11, 11)
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  accessTypeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  dateOfBirth: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn([0, 1])
  active: number;
}
