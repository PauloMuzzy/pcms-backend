import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class FindPatientsRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID('4')
  uuid?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

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
  @IsIn(['0', '1'])
  @IsNumberString()
  active?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsIn(['name', 'date_of_birth', 'created_at'])
  sort_field?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sort_direction?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  @IsIn(['10', '20', '50'])
  items_per_page?: string;
}
