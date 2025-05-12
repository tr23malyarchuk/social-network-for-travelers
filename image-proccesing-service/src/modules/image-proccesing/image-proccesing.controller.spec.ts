import { Test, TestingModule } from '@nestjs/testing';
import { ImageProccesingController } from './image-proccesing.controller';
import { ImageProccesingService } from './image-proccesing.service';

describe('ImageProccesingController', () => {
  let controller: ImageProccesingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageProccesingController],
      providers: [ImageProccesingService],
    }).compile();

    controller = module.get<ImageProccesingController>(ImageProccesingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
