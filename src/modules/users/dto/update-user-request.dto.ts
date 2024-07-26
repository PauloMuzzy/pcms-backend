import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  uuid: string;

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
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(11, 11)
  cpf?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  accessTypeId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  dateOfBirth?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn([0, 1])
  active?: number;
}
