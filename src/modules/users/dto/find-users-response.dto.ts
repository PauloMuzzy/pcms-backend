import { ApiProperty } from '@nestjs/swagger';

export class FindUsersResponseDto {
  @ApiProperty()
  uuid?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  accessTypeId: number;

  @ApiProperty()
  dateOfBirth: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  active: string;
}
