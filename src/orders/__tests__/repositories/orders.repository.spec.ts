import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../../../products/entities/products.entity';
import { UsersCartEntity } from '../../../users/entities/users.cart.entity';
import { OrdersEntity } from '../../entities/orders.entity';
import { OrdersDetailsRepository } from '../../repositories/orders.details.repository';
import { OrdersRepository } from '../../repositories/orders.repository';

describe('OrdersRepository', () => {
  let repository: OrdersRepository;
  let typeorm: Repository<OrdersEntity>;
  let ordersDetailsRepository: OrdersDetailsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersRepository,
        {
          provide: getRepositoryToken(OrdersEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: OrdersDetailsRepository,
          useValue: {
            createMany: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<OrdersRepository>(OrdersRepository);
    typeorm = module.get(getRepositoryToken(OrdersEntity));
    ordersDetailsRepository = module.get<OrdersDetailsRepository>(
      OrdersDetailsRepository,
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createSingle', () => {
    beforeEach(async () => {
      const data = new UsersCartEntity();
      const product = new ProductsEntity();
      product.price = 11.99;
      data.quantity = 10;
      data.product = product;
      await repository.createSingle([data]);
    });

    it('should call typeorm.create', async () => {
      expect(typeorm.create).toHaveBeenCalledTimes(1);
    });

    it('should call typeorm.save', async () => {
      expect(typeorm.save).toHaveBeenCalledTimes(1);
    });

    it('should call ordersDetailsRepository.createMany', async () => {
      expect(ordersDetailsRepository.createMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('getByUser', () => {
    it('should call typeorm.find', async () => {
      await repository.getByUser('user');
      expect(typeorm.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMany', () => {
    it('should call typeorm.find', async () => {
      await repository.getMany();
      expect(typeorm.find).toHaveBeenCalledTimes(1);
    });
  });
});
