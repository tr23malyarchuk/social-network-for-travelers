import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '10mb' }));
  app.enableCors();

  const uploadsPath = path.join('C:', 'Users', 'Bohdan', 'Desktop', 'social-network-for-travelers', 'backend', 'image-proccesing-service', 'uploads');
  console.log('Uploads folder:', uploadsPath);
  app.use('/uploads', express.static(uploadsPath));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
