import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../../../orders/services/orders.service';
import { ProductsService } from '../../../products/services/products.service';
import { UsersCartProcessAdditionRequest } from '../../_types/users.cart.types';
import { UsersCartRepository } from '../../repositories/users.cart.repository';
import { UsersCartService } from '../../services/users.cart.service';

describe('UsersCartService', () => {
  let service: UsersCartService;
  let repository: UsersCartRepository;
  let productService: ProductsService;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersCartService,
        {
          provide: UsersCartRepository,
          useValue: {
            getCountByUserAndProduct: jest.fn().mockResolvedValue(0),
            createSingle: jest.fn().mockResolvedValue({ id: 'cart-id' }),
            getByUser: jest.fn().mockResolvedValue([
              {
                quantity: 10,
                product: {
                  name: 'product-name',
                  description: 'product-description',
                  price: 10,
                },
              },
            ]),
            processCart: jest.fn(),
            deleteByUser: jest.fn(),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            getSingle: jest.fn().mockResolvedValue({ quantity: 10 }),
          },
        },
        {
          provide: OrdersService,
          useValue: {
            createSingle: jest.fn().mockResolvedValue({ id: 'product-id' }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersCartService>(UsersCartService);
    repository = module.get<UsersCartRepository>(UsersCartRepository);
    productService = module.get<ProductsService>(ProductsService);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processAddition', () => {
    beforeEach(async () => {
      const payload: UsersCartProcessAdditionRequest = {
        quantity: 1,
        productId: 'product-id',
      };
      await service.processAddition('user-id', payload);
    });

    it('should call productService.getSingle', async () => {
      expect(productService.getSingle).toHaveBeenCalledTimes(1);
    });

    it('should call repository.getCountByUserAndProduct', async () => {
      expect(repository.getCountByUserAndProduct).toHaveBeenCalledTimes(1);
    });

    it('should call repository.createSingle', async () => {
      expect(repository.createSingle).toHaveBeenCalledTimes(1);
    });
  });

  describe('processPurchase', () => {
    beforeEach(async () => {
      await service.processPurchase('user-id');
    });

    it('should call repository.getByUser', async () => {
      expect(repository.getByUser).toHaveBeenCalledTimes(1);
    });

    it('should call ordersService.createSingle', async () => {
      expect(ordersService.createSingle).toHaveBeenCalledTimes(1);
    });

    it('should call repository.processCart', async () => {
      expect(repository.processCart).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteByUser', () => {
    it('should call repository.deleteByUser', async () => {
      await service.deleteByUser('user-id');
      expect(repository.deleteByUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('getByUser', () => {
    it('should call repository.getByUser', async () => {
      await service.getCart('user-id');
      expect(repository.getByUser).toHaveBeenCalledTimes(1);
    });
  });
});
