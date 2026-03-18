import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from '@config/database/typeorm.config';
import { LoggerModule } from '@common/logger/logger.module';
import { ClerkModule } from '@common/clerk/clerk.module';
import { ClerkAuthGuard } from '@common/guards/clerk-auth.guard';
import { HealthModule } from '@modules/health/health.module';
import { AdminModule } from '@modules/admin/admin.module';
import { PsychologistsModule } from '@modules/psychologists/psychologists.module';
import { PatientsModule } from '@modules/patients/patients.module';
import { GendersModule } from '@modules/genders/genders.module';
import { ProfessionsModule } from '@modules/professions/professions.module';
import { EmergencyContactRelationshipsModule } from '@modules/emergency-contact-relationships/emergency-contact-relationships.module';
import { DemandThemesModule } from '@modules/demand-themes/demand-themes.module';
import { DemandsModule } from '@modules/demands/demands.module';
import { TagsModule } from '@modules/tags/tags.module';
import { SessionReportsModule } from '@modules/session-reports/session-reports.module';
import { DemandAccessRequestsModule } from '@modules/demand-access-requests/demand-access-requests.module';
import { AccessAuditLogsModule } from '@modules/access-audit-logs/access-audit-logs.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig,
    }),

    // Logger (Global)
    LoggerModule,

    // Clerk Authentication (Global)
    ClerkModule,

    // Modules
    HealthModule,
    AdminModule,
    PsychologistsModule,
    PatientsModule,
    GendersModule,
    ProfessionsModule,
    EmergencyContactRelationshipsModule,
    DemandThemesModule,
    DemandsModule,
    TagsModule,
    SessionReportsModule,
    DemandAccessRequestsModule,
    AccessAuditLogsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Apply ClerkAuthGuard globally (can be overridden with @Public())
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
})
export class AppModule {}
