import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum DemandStatus {
  ACTIVE = 'active',
  IN_PROGRESS = 'in_progress',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  TRANSFERRED = 'transferred',
}

export class UpdateDemandStatusDto {
  @ApiProperty({
    example: 'in_progress',
    description: 'Novo status da demanda',
    enum: DemandStatus,
  })
  @IsEnum(DemandStatus, {
    message: 'Status deve ser: active, in_progress, paused, completed ou transferred',
  })
  @IsNotEmpty()
  status: DemandStatus;

  @ApiPropertyOptional({
    example: 'Iniciando atendimento regular',
    description: 'Motivo da mudança de status',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
