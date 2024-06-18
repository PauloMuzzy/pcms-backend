import { ApiProperty } from '@nestjs/swagger';

export class findAditionalInformationByPatientRequestDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  patientId: number;

  @ApiProperty()
  diagnosis: string;

  @ApiProperty()
  medications: string;
}
