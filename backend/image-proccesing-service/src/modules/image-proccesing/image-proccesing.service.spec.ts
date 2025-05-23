import { Test, TestingModule } from '@nestjs/testing';
import { ImageProccesingService } from './image-proccesing.service';

describe('ImageProccesingService', () => {
  let service: ImageProccesingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageProccesingService],
    }).compile();

    service = module.get<ImageProccesingService>(ImageProccesingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
