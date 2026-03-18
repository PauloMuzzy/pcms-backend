import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandAccessRequest } from './entities/demand-access-request.entity';
import { DemandAccessRequestsController } from './demand-access-requests.controller';
import { DemandAccessRequestsService } from './demand-access-requests.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemandAccessRequest])],
  controllers: [DemandAccessRequestsController],
  providers: [DemandAccessRequestsService],
  exports: [DemandAccessRequestsService],
})
export class DemandAccessRequestsModule {}
