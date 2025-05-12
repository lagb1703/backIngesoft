import { Test, TestingModule } from '@nestjs/testing';
import { PaysheetService } from './paysheet.service';

describe('PaysheetService', () => {
  let service: PaysheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaysheetService],
    }).compile();

    service = module.get<PaysheetService>(PaysheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
