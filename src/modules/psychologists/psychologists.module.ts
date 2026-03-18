import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Psychologist } from './entities/psychologist.entity';
import { PsychologistsController } from './psychologists.controller';
import { PsychologistsService } from './psychologists.service';

@Module({
  imports: [TypeOrmModule.forFeature([Psychologist])],
  controllers: [PsychologistsController],
  providers: [PsychologistsService],
  exports: [PsychologistsService],
})
export class PsychologistsModule {}
