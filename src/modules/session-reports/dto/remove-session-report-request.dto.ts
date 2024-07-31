import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RemoveSessionReportRequestDto {
  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  uuid: string;
}
