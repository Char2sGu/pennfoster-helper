import { Test, TestingModule } from '@nestjs/testing';

import { WeegyService } from './weegy.service';

describe('WeegyService', () => {
  let service: WeegyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeegyService],
    }).compile();

    service = module.get<WeegyService>(WeegyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
