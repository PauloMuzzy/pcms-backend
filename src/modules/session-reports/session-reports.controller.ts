import { Controller } from '@nestjs/common';
import { SessionReportsService } from 'src/modules/session-reports/session-reports.service';

@Controller('session-reports')
export class SessionReportsController {
  constructor(private reportsService: SessionReportsService) {}
}
