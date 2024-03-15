import { Test, TestingModule } from '@nestjs/testing';
import { CompanyDataController } from './company-data.controller';
import { CompanyDataService } from './company-data.service';

describe('CompanyDataController', () => {
  let controller: CompanyDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyDataController],
      providers: [CompanyDataService],
    }).compile();

    controller = module.get<CompanyDataController>(CompanyDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
