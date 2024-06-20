import { Module } from '@nestjs/common';
import { AditionalInformationsController } from './aditional-informations.controller';
import { AditionalInformationsService } from './aditional-informations.service';

@Module({
  imports: [],
  controllers: [AditionalInformationsController],
  providers: [AditionalInformationsService],
})
export class AditionalInformationsModule {}
