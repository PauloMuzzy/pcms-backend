import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception.filter';
import { LoggerService } from 'src/common/modules/logger/logger.service';
import { AppModule } from './app.module';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  app.enableCors({ origin: 'http://localhost:3000' });
  const config = new DocumentBuilder()
    .setTitle('PCMS API')
    .setDescription('The PCMS API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Users')
    .addTag('Patients')
    .addTag('Demands')
    .addTag('Options')
    .addTag('CronJobs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
