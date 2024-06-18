import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAditionInformationsRequestDto } from 'src/modules/aditional-informations/dto/create-aditional-informations-request.dto';
import { AdditionalInformation } from 'src/modules/aditional-informations/entities/aditional-informations.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AditionalInformationsService {
  constructor(
    @InjectRepository(AdditionalInformation)
    private additionalInformationRepository: Repository<AdditionalInformation>,
  ) {}

  async create(params: CreateAditionInformationsRequestDto) {
    const aditionalInformations = new AdditionalInformation();
    aditionalInformations.patientId = params.patientId;
    aditionalInformations.diagnosis = params.diagnosis;
    aditionalInformations.medications = params.medications;
    aditionalInformations.createdAt = new Date();
    aditionalInformations.updatedAt = new Date();
    await this.additionalInformationRepository.save(aditionalInformations);
  }

  async findByPatientId(patientId: number) {
    return await this.additionalInformationRepository.find({
      where: { patientId },
    });
  }
}
