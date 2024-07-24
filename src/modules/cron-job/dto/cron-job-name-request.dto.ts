import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CronJobNameRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
