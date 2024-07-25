import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class FindCronJobsResponseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  frequency: string;

  @IsOptional()
  @IsString()
  lastExecution: string | null;

  @IsOptional()
  @IsNumber()
  lastExecutionDuration: number | null;

  @IsNotEmpty()
  @IsString()
  nextExecution: string;

  @IsNotEmpty()
  @IsBoolean()
  running: boolean;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
