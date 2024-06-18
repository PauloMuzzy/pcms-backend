import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalInformation } from 'src/modules/aditional-informations/entities/aditional-informations.entity';
import { AditionalInformationsController } from './aditional-informations.controller';
import { AditionalInformationsService } from './aditional-informations.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalInformation])],
  controllers: [AditionalInformationsController],
  providers: [AditionalInformationsService],
})
export class AditionalInformationsModule {}
