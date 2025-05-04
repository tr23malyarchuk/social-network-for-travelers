import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PostModule } from './modules/post/post.module';

async function bootstrap() {
  const app = await NestFactory.create(PostModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'post-service',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
