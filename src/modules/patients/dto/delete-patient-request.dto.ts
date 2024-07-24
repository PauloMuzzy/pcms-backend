import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DeletePatientRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  uuid: string;
}
