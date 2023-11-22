import { Test, TestingModule } from '@nestjs/testing';
import { AWSS3Service } from '../../../aws/aws.s3.service';
import {
  ProductsCreateSingleRequest,
  ProductsGetManyRequest,
  ProductsUpdateSingleRequest,
} from '../../_types/products.types';
import { ProductsImagesRepository } from '../../repositories/products.images.repository';
import { ProductsRepository } from '../../repositories/products.repository';
import { ProductsService } from '../../services/products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;
  let awsS3Service: AWSS3Service;
  let productImagesRepository: ProductsImagesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 'product-id' }),
            delete: jest.fn(),
            update: jest.fn(),
            updateStatus: jest.fn(),
            getFiltered: jest.fn(),
            getSingle: jest.fn(),
            decreaseStock: jest.fn(),
          },
        },
        {
          provide: AWSS3Service,
          useValue: {
            deleteFiles: jest.fn(),
            uploadFiles: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: ProductsImagesRepository,
          useValue: {
            deleteManyByProductId: jest.fn(),
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
    awsS3Service = module.get<AWSS3Service>(AWSS3Service);
    productImagesRepository = module.get<ProductsImagesRepository>(
      ProductsImagesRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.create', async () => {
      const payload: ProductsCreateSingleRequest = {
        name: 'The frosty chicken',
        description: 'The best frozen chicken in the world it can last decades',
        price: 10.99,
        quantity: 10,
        category: '{{categoryId}}',
      };
      await service.create(payload);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should call repository.update', async () => {
      const payload: ProductsUpdateSingleRequest = {
        name: 'The frosty chicken',
        description: 'The best frozen chicken in the world it can last decades',
        price: 10.99,
        quantity: 10,
        category: '{{categoryId}}',
      };
      await service.update('prodcut-id', payload);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should call AWSS3Service.deleteFiles', async () => {
      await service.delete('product-id');
      expect(awsS3Service.deleteFiles).toHaveBeenCalledTimes(1);
    });

    it('should call repository.delete', async () => {
      await service.delete('product-id');
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });

    it('should call productImagesRepository.deleteManyByProductId', async () => {
      await service.delete('product-id');
      expect(
        productImagesRepository.deleteManyByProductId,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateStatus', () => {
    it('should call repository.updateStatus', async () => {
      await service.updateStatus('product-id', { isActive: true });
      expect(repository.updateStatus).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMany', () => {
    it('should call repository.getFiltered', async () => {
      const payload: ProductsGetManyRequest = {
        limit: 10,
        page: 1,
      };
      await service.getMany(payload);
      expect(repository.getFiltered).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSingle', () => {
    it('should call repository.getSingle', async () => {
      await service.getSingle('product-id');
      expect(repository.getSingle).toHaveBeenCalledTimes(1);
    });
  });

  describe('uploadImages', () => {
    it('should call awsS3Service.uploadFiles', async () => {
      await service.uploadImages('product-id', []);
      expect(awsS3Service.uploadFiles).toHaveBeenCalledTimes(1);
    });

    it('should call productImagesRepository.add', async () => {
      await service.uploadImages('product-id', []);
      expect(productImagesRepository.add).toHaveBeenCalledTimes(1);
    });
  });

  describe('decreaseStock', () => {
    it('should call repository.decreaseStock', async () => {
      await service.decreaseStock('product-id', 1);
      expect(repository.decreaseStock).toHaveBeenCalledTimes(1);
    });
  });
});
