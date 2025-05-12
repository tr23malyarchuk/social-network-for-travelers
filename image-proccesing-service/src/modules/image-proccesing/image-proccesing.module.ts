import { Module } from '@nestjs/common';
import { ImageProccesingService } from './image-proccesing.service';
import { ImageProccesingController } from './image-proccesing.controller';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'IMAGE_PROCCESSING',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'image_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [ImageProccesingController],
  providers: [ImageProccesingService],
})
export class ImageProccesingModule {}
