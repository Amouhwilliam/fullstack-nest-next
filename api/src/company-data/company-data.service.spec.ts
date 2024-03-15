import { Test, TestingModule } from '@nestjs/testing';
import { CompanyDataService } from './company-data.service';

describe('CompanyDataService', () => {
  let service: CompanyDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyDataService],
    }).compile();

    service = module.get<CompanyDataService>(CompanyDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
