import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/modules/database/database.module';
import { RecordAndDuplicationCheckerModule } from 'src/common/modules/record-and-duplication-checker/record-and-duplication-checker.module';
import { UuidModule } from 'src/common/modules/uuid/uuid.module';
import { DemandsController } from 'src/modules/demands/demands.controller';
import { DemandsService } from 'src/modules/demands/demands.service';

@Module({
  imports: [DatabaseModule, UuidModule, RecordAndDuplicationCheckerModule],
  controllers: [DemandsController],
  providers: [DemandsService],
})
export class DemandsModule {}
