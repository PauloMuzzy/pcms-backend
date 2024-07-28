import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/modules/database/database.module';
import { UniqueRegisterCheckerModule } from 'src/common/modules/unique-register-checker/unique-register-checker-module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { DemandsController } from 'src/modules/demands/demands.controller';
import { DemandsService } from 'src/modules/demands/demands.service';

@Module({
  imports: [DatabaseModule, UuidModule, UniqueRegisterCheckerModule],
  controllers: [DemandsController],
  providers: [DemandsService],
})
export class DemandsModule {}
