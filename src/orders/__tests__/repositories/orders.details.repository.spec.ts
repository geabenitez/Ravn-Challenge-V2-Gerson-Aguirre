import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../../../products/entities/products.entity';
import { ProductsService } from '../../../products/services/products.service';
import { UsersCartEntity } from '../../../users/entities/users.cart.entity';
import { OrdersDetailsEntity } from '../../entities/orders.details.entity';
import { OrdersEntity } from '../../entities/orders.entity';
import { OrdersDetailsRepository } from '../../repositories/orders.details.repository';

describe('OrdersDetailsRepository', () => {
  let repository: OrdersDetailsRepository;
  let typeorm: Repository<OrdersDetailsEntity>;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersDetailsRepository,
        {
          provide: getRepositoryToken(OrdersDetailsEntity),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            decreaseStock: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<OrdersDetailsRepository>(OrdersDetailsRepository);
    typeorm = module.get(getRepositoryToken(OrdersDetailsEntity));
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createMany', () => {
    beforeEach(async () => {
      const order = new OrdersEntity();
      const data = new UsersCartEntity();
      data.product = new ProductsEntity();
      await repository.createMany(order, [data]);
    });

    it('should call productsService.decreaseStock', async () => {
      expect(productsService.decreaseStock).toHaveBeenCalledTimes(1);
    });

    it('should call typeorm.create', async () => {
      expect(typeorm.create).toHaveBeenCalledTimes(1);
    });

    it('should call typeorm.save', async () => {
      expect(typeorm.save).toHaveBeenCalledTimes(1);
    });
  });
});
