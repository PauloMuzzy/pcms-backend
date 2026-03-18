import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateSessionReportDto } from './create-session-report.dto';

// Omit demand_id pois não deve ser alterado após criação
export class UpdateSessionReportDto extends PartialType(
  OmitType(CreateSessionReportDto, ['demand_id'] as const),
) {}
