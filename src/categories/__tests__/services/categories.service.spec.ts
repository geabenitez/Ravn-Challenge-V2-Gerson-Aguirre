import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesRepository } from '../../repositories/categories.repository';
import { CategoriesService } from '../../services/categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: CategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoriesRepository,
          useValue: {
            getMany: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMany', () => {
    it('should call repository.getMany', async () => {
      await service.getMany();
      expect(repository.getMany).toHaveBeenCalledTimes(1);
    });
  });
});
