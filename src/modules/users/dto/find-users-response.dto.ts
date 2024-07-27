import { ApiProperty } from '@nestjs/swagger';

export class FindUsersResponseDto {
  @ApiProperty()
  uuid?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  access_type_id: number;

  @ApiProperty()
  date_of_birth: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  active: number;
}
