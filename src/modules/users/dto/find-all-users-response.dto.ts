import { ApiProperty } from '@nestjs/swagger';

export class FindAllUsersResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  active: number;

  @ApiProperty()
  accessType: string;
}
