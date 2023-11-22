import { Test, TestingModule } from '@nestjs/testing';
import {
  ProductUpdateSingleStatusRequest,
  ProductsGetManyRequest,
} from '../../_types/products.types';
import { ProductsController } from '../../controllers/products.controller';
import { ProductsService } from '../../services/products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            updateStatus: jest.fn(),
            uploadImages: jest.fn(),
            getSingle: jest.fn(),
            getMany: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create', async () => {
      const payload = {
        name: 'The frosty chicken',
        description: 'The best frozen chicken in the world it can last decades',
        price: 10.99,
        quantity: 10,
        category: '{{categoryId}}',
      };
      await controller.create(payload);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should call service.update', async () => {
      const payload = {
        name: 'The frosty chicken',
        description: 'The best frozen chicken in the world it can last decades',
        price: 10.99,
        quantity: 10,
        category: '{{categoryId}}',
      };
      await controller.update('product-id', payload);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should call service.delete', async () => {
      await controller.delete('product-id');
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateSingleStatus', () => {
    it('should call service.updateSingleStatus', async () => {
      const payload: ProductUpdateSingleStatusRequest = {
        isActive: false,
      };
      await controller.updateSingleStatus('product-id', payload);
      expect(service.updateStatus).toHaveBeenCalledTimes(1);
    });
  });

  describe('uploadImages', () => {
    it('should call service.uploadImages', async () => {
      const files = {
        images: [
          {
            fieldname: 'file',
            originalname: 'test-image.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            size: 1024,
            buffer: Buffer.from('some data', 'utf-8'),
            destination: 'uploads/',
            filename: 'test-image.jpg',
            path: 'uploads/test-image.jpg',
            stream: null,
          },
        ] as Express.Multer.File[],
      };
      await controller.uploadImages('product-id', files);
      expect(service.uploadImages).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSingle', () => {
    it('should call service.getSingle', async () => {
      await controller.getSingle('product-id');
      expect(service.getSingle).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMany', () => {
    it('should call service.getMany', async () => {
      const payload: ProductsGetManyRequest = {
        limit: 10,
        page: 1,
        isActive: true,
        category: 'category-id',
      };
      await controller.getMany(payload);
      expect(service.getMany).toHaveBeenCalledTimes(1);
    });
  });
});
