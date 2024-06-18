import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAditionInformationsRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  diagnosis: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 500)
  medications: string;
}
