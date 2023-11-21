import { ValidationPipe } from '@nestjs/common';
import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (process.env.NODE_ENV !== 'production') {
    const swaggerTitle = 'Chicken Store API Documentation';
    const config = new DocumentBuilder()
      .setTitle(swaggerTitle)
      .setDescription(
        'Welcome to the Chicken Store API documentation. Our API provides a comprehensive set of operations for managing a chicken store, including inventory management, order processing, and customer interactions.',
      )
      .addBearerAuth()
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    });
    SwaggerModule.setup('api', app, document, {
      customSiteTitle: swaggerTitle,
    });
  }

  await app.listen(3000);
}

bootstrap().catch(() => {
  fs.writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
  process.exit(1);
});
