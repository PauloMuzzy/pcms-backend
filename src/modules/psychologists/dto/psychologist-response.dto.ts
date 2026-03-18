import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PsychologistResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  last_name: string;

  @ApiProperty()
  @Expose()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  @Expose()
  cpf: string;

  @ApiProperty()
  @Expose()
  crp?: string;

  @ApiProperty()
  @Expose()
  phone?: string;

  @ApiProperty()
  @Expose()
  date_of_birth: Date;

  @ApiProperty()
  @Expose()
  role: string;

  @ApiProperty()
  @Expose()
  is_active: boolean;

  @ApiProperty()
  @Expose()
  email_verified_at?: Date;

  @ApiProperty()
  @Expose()
  created_at: Date;

  @ApiProperty()
  @Expose()
  updated_at: Date;
}
