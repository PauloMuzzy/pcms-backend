import { ApiProperty } from '@nestjs/swagger';

export class FindPatientsResponseDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  genderId: number;

  @ApiProperty()
  professionId: number;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  emergencyContactName: string;

  @ApiProperty()
  emergencyContactPhone: string;

  @ApiProperty()
  emergencyContactRelationshipId: number;

  @ApiProperty()
  active: string;
}
