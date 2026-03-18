import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessAuditLog } from './entities/access-audit-log.entity';
import { AccessAuditLogsController } from './access-audit-logs.controller';
import { AccessAuditLogsService } from './access-audit-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccessAuditLog])],
  controllers: [AccessAuditLogsController],
  providers: [AccessAuditLogsService],
  exports: [AccessAuditLogsService],
})
export class AccessAuditLogsModule {}
