import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from '../../entities/categories.entity';
import { CategoriesRepository } from '../../repositories/categories.repository';

describe('CategoriesRepository', () => {
  let repository: CategoriesRepository;
  let typeorm: Repository<CategoriesEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesRepository,
        {
          provide: getRepositoryToken(CategoriesEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<CategoriesRepository>(CategoriesRepository);
    typeorm = module.get(getRepositoryToken(CategoriesEntity));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getSingle', () => {
    it('should call typeorm.findOne', async () => {
      await repository.getSingle('category-id');
      expect(typeorm.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMany', () => {
    it('should call typeorm.find', async () => {
      await repository.getMany();
      expect(typeorm.find).toHaveBeenCalledTimes(1);
    });
  });
});
