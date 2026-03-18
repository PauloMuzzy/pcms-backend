import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionReport } from './entities/session-report.entity';
import { SessionReportsController } from './session-reports.controller';
import { SessionReportsService } from './session-reports.service';
import { Tag } from '@modules/tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionReport, Tag])],
  controllers: [SessionReportsController],
  providers: [SessionReportsService],
  exports: [SessionReportsService],
})
export class SessionReportsModule {}
