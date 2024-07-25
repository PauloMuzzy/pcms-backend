import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/modules/database/database.module';
import { OptionsController } from 'src/modules/options/options.controller';
import { OptionsService } from 'src/modules/options/options.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
