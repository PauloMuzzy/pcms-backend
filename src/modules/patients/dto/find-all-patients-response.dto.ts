import { ApiProperty } from '@nestjs/swagger';

export class FindAllPatientsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false })
  cpf?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  gender: number;

  @ApiProperty()
  profession: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  emergencyContactName: string;

  @ApiProperty()
  emergencyContactPhone: string;

  @ApiProperty()
  emergencyContactRelationship: string;

  @ApiProperty()
  active: number;
}
