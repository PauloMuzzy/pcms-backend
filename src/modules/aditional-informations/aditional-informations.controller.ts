import { Controller } from '@nestjs/common';
import { AditionalInformationsService } from 'src/modules/aditional-informations/aditional-informations.service';

@Controller('aditional-informations')
export class AditionalInformationsController {
  constructor(
    private aditionalInformationsService: AditionalInformationsService,
  ) {}
}
