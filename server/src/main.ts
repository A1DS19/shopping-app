import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const pinoLogger = app.get(Logger);
  app.useLogger(pinoLogger);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This will remove any additional properties that are not defined in the DTO
    }),
  );
  pinoLogger.log(`Starting server on port ${configService.getOrThrow('PORT')}`);
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
