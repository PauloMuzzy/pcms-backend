import { ApiProperty } from '@nestjs/swagger';

export class additionalInformation {
  @ApiProperty()
  diagnosis: string;

  @ApiProperty()
  medications: string;
}

export class report {
  @ApiProperty()
  reportId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: Date;
}

export class FindSessionReportsPerPatientResponseDto {
  @ApiProperty()
  patientId: number;

  @ApiProperty()
  patientName: string;

  @ApiProperty()
  initialDemand: string;

  @ApiProperty({ type: () => additionalInformation })
  additionalInformation: additionalInformation;

  @ApiProperty({ type: () => [report] })
  reports: report[];
}
