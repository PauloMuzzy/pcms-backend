import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeletePatientRequestDto {
  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  uuid: string;
}
