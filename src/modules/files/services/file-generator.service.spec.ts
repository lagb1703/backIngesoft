import { Test, TestingModule } from '@nestjs/testing';
import { FileGeneratorService } from './file-generator.service';

describe('FileGeneratorService', () => {
  let service: FileGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileGeneratorService],
    }).compile();

    service = module.get<FileGeneratorService>(FileGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
