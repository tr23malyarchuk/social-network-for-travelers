import { Controller } from '@nestjs/common';
import { ImageProccesingService } from './image-proccesing.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class ImageProccesingController {
  constructor(private readonly imageProccesingService: ImageProccesingService) {}
  
  @EventPattern('proccesImage')
  async proccesImage(@Payload() data: { imageUrl: string }) {
    console.log('📦 Отримано подію proccesImage:', data);
    return this.imageProccesingService.proccesImage(data.imageUrl);
  }
}
