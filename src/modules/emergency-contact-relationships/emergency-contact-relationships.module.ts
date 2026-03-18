import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContactRelationship } from './entities/emergency-contact-relationship.entity';
import { EmergencyContactRelationshipsController } from './emergency-contact-relationships.controller';
import { EmergencyContactRelationshipsService } from './emergency-contact-relationships.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyContactRelationship])],
  controllers: [EmergencyContactRelationshipsController],
  providers: [EmergencyContactRelationshipsService],
  exports: [EmergencyContactRelationshipsService],
})
export class EmergencyContactRelationshipsModule {}
