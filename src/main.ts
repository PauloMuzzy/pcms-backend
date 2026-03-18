import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerService } from '@common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Custom Logger
  const logger = app.get(LoggerService);
  app.useLogger(logger);

  // Global Validation Pipe (class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });

  // Global Prefix
  app.setGlobalPrefix('api/v1');

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('PCMS Backend API')
    .setDescription('Sistema de Gerenciamento de Atendimentos Psicológicos')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('health', 'Health Check Endpoints')
    .addTag('psychologists', 'Psychologist Management')
    .addTag('patients', 'Patient Management')
    .addTag('demands', 'Demand Management')
    .addTag('session-reports', 'Session Reports Management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Start Server
  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}`, 'Bootstrap');
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`, 'Bootstrap');
  logger.log(`🏥 Health check: http://localhost:${port}/api/v1/health`, 'Bootstrap');
}

bootstrap();
