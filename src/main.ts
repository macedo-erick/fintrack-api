import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('FinTrack API')
    .setDescription('The FinTrack API description')
    .setVersion('1.0.0')
    .setLicense('GNU', 'https://choosealicense.com/licenses/lgpl-3.0/')
    .setContact('Erick Macedo', null, 'macedo.eriick@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
