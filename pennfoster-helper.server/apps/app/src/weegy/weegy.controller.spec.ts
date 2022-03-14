import { Test, TestingModule } from '@nestjs/testing';

import { WeegyController } from './weegy.controller';

describe('WeegyController', () => {
  let controller: WeegyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeegyController],
    }).compile();

    controller = module.get<WeegyController>(WeegyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
