import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';
import { AuthGuard } from './modules/auth/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('FinTrack API')
    .setDescription('The FinTrack API description')
    .setVersion('1.0.0')
    .setLicense('GNU', 'https://choosealicense.com/licenses/lgpl-3.0/')
    .setContact('Erick Macedo', null, 'macedo.eriick@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const paths = Object.keys(document.paths).sort();

  document.paths = paths.reduce((acc, path) => {
    acc[path] = document.paths[path];
    return acc;
  }, {});

  SwaggerModule.setup('api/v1/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard(new JwtService(), new Reflector()));
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
