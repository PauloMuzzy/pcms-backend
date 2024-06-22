import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { CustomValidationPipe } from 'src/common/pipes/custom-validation.pipe';
import { AppModule } from './app.module';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CustomValidationPipe());
  app.enableCors({ origin: 'http://localhost:3000' });
  const config = new DocumentBuilder()
    .setTitle('PCMS API')
    .setDescription('The PCMS API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Users')
    .addTag('Patients')
    .addTag('Auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
