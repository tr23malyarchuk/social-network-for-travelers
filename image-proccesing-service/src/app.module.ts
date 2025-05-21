import { Module } from '@nestjs/common';
import { ImageProccesingModule } from './modules/image-proccesing/image-proccesing.module';

@Module({
  imports: [ImageProccesingModule],
})
export class AppModule {}
