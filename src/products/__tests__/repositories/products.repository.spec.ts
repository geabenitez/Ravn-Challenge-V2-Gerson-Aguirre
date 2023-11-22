import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesRepository } from '../../../categories/repositories/categories.repository';
import { ProductsCreateSingleRequest } from '../../_types/products.types';
import { ProductsEntity } from '../../entities/products.entity';
import { ProductsRepository } from '../../repositories/products.repository';

describe('ProductsRepository', () => {
  let repository: ProductsRepository;
  let typeorm: Repository<ProductsEntity>;
  let categoriesRepository: CategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsRepository,
        {
          provide: getRepositoryToken(ProductsEntity),
          useValue: {
            findOneOrFail: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: CategoriesRepository,
          useValue: {
            getSingle: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ProductsRepository>(ProductsRepository);
    typeorm = module.get(getRepositoryToken(ProductsEntity));
    categoriesRepository =
      module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getSingle', () => {
    it('should call typeorm.findOneOrFail', async () => {
      await repository.getSingle('uuid');
      expect(typeorm.findOneOrFail).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    beforeEach(async () => {
      const payload: ProductsCreateSingleRequest = {
        name: 'name',
        description: 'description',
        price: 11.99,
        category: 'uuid',
        quantity: 2,
      };
      await repository.create(payload);
    });

    it('should call categoriesRepository.getSingle', async () => {
      expect(categoriesRepository.getSingle).toHaveBeenCalledTimes(1);
    });

    it('should call typeorm.create', async () => {
      expect(typeorm.create).toHaveBeenCalledTimes(1);
    });

    it('should call typeorm.save', async () => {
      expect(typeorm.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should call typeorm.softDelete', async () => {
      await repository.delete('uuid');
      expect(typeorm.softDelete).toHaveBeenCalledTimes(1);
    });
  });
});
