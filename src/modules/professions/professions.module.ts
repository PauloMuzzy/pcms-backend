import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profession } from './entities/profession.entity';
import { ProfessionsController } from './professions.controller';
import { ProfessionsService } from './professions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profession])],
  controllers: [ProfessionsController],
  providers: [ProfessionsService],
  exports: [ProfessionsService],
})
export class ProfessionsModule {}
