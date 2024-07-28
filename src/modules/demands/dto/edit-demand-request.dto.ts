import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class EditDemandRequestDto {
  @ApiProperty()
  @IsUUID()
  uuid: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  demand_description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  problem_history?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  symptoms?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  treatment_goals?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  impact_on_life?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  previous_attempts?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  social_support?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  aggravating_factors?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  treatment_expectations?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  motivation_for_change?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  medication?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  other_therapies?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  additional_observations?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  current_feeling_id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  feeling_intensity?: number;
}
