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
  gender: string;

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
  active: string;
}
