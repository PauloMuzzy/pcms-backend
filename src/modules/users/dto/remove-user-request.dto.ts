import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RemoveUserRequestDto {
  @ApiProperty()
  @IsUUID('4')
  uuid: string;
}
