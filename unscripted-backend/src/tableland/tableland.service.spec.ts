import { Test, TestingModule } from '@nestjs/testing';
import { TablelandService } from './tableland.service';

describe('TablelandService', () => {
  let service: TablelandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablelandService],
    }).compile();

    service = module.get<TablelandService>(TablelandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
