import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RemovePsychologistRequestDto {
  @ApiProperty()
  @IsUUID('4')
  uuid: string;
}
