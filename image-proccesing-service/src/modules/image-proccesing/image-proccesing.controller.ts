import { Controller } from '@nestjs/common';
import { ImageProccesingService } from './image-proccesing.service';
import {MessagePattern} from '@nestjs/microservices';
import { Payload } from '@nestjs/microservices';

@Controller('image-proccesing')
export class ImageProccesingController {
  constructor(private readonly imageProccesingService: ImageProccesingService) {}
  
  @MessagePattern('proccesImage')
  async proccesImage(@Payload() data: {postId: number, imageUrl: string}){
     return this.imageProccesingService.proccesImage();
  }
}
