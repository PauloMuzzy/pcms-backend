import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class FindCronJobsResponseDto {
  @ApiProperty({
    description: 'Name of the cron job',
    example: 'clearLogAppTable',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Frequency of the cron job',
    example: '0 0-23/1 * * *',
  })
  @IsString()
  @IsNotEmpty()
  frequency: string;

  @ApiProperty({
    description: 'Last execution',
    example: null,
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  lastExecution: string | null;

  @ApiProperty({
    description: 'Duration of the last execution',
    example: null,
    type: 'number',
    nullable: true,
  })
  @IsOptional()
  lastExecutionDuration: number | null;

  @ApiProperty({
    description: 'Next execution',
    example: '2024-07-26T02:00:00.000Z',
  })
  @IsDateString()
  nextExecution: string;

  @ApiProperty({
    description: 'Whether the cron job is currently running',
    example: false,
  })
  @IsBoolean()
  running: boolean;

  @ApiProperty({ description: 'Whether the cron job is active', example: true })
  @IsBoolean()
  active: boolean;
}
