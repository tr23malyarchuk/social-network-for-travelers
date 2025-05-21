import { Module } from '@nestjs/common';
import { ImageProccesingService } from './image-proccesing.service';
import { ImageProccesingController } from './image-proccesing.controller';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
  controllers: [ImageProccesingController],
  providers: [ImageProccesingService],
})
export class ImageProccesingModule {}
