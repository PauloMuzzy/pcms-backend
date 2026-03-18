import { PartialType } from '@nestjs/swagger';
import { CreateDemandDto } from './create-demand.dto';

export class UpdateDemandDto extends PartialType(CreateDemandDto) {}
