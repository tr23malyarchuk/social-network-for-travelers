import { Test, TestingModule } from '@nestjs/testing';
import { AuthentificattionController } from './authentificattion.controller';
import { AuthentificattionService } from './authentificattion.service';

describe('AuthentificattionController', () => {
  let controller: AuthentificattionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthentificattionController],
      providers: [AuthentificattionService],
    }).compile();

    controller = module.get<AuthentificattionController>(AuthentificattionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
