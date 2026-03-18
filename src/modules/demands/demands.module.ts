import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demand } from './entities/demand.entity';
import { DemandsController } from './demands.controller';
import { DemandsService } from './demands.service';

@Module({
  imports: [TypeOrmModule.forFeature([Demand])],
  controllers: [DemandsController],
  providers: [DemandsService],
  exports: [DemandsService],
})
export class DemandsModule {}
