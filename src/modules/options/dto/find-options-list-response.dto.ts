import { ApiProperty } from '@nestjs/swagger';

export class FindOptionsListResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;
}
