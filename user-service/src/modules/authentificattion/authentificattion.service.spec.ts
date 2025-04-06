import { Test, TestingModule } from '@nestjs/testing';
import { AuthentificattionService } from './authentificattion.service';

describe('AuthentificattionService', () => {
  let service: AuthentificattionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthentificattionService],
    }).compile();

    service = module.get<AuthentificattionService>(AuthentificattionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
