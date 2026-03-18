import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandTheme } from './entities/demand-theme.entity';
import { DemandThemesController } from './demand-themes.controller';
import { DemandThemesService } from './demand-themes.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemandTheme])],
  controllers: [DemandThemesController],
  providers: [DemandThemesService],
  exports: [DemandThemesService],
})
export class DemandThemesModule {}
