import { Test, TestingModule } from '@nestjs/testing';
import { OrdersRepository } from '../../repositories/orders.repository';
import { OrdersService } from '../../services/orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: OrdersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useValue: {
            createSingle: jest.fn(),
            getByUser: jest.fn().mockResolvedValue([]),
            getMany: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<OrdersRepository>(OrdersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSingle', () => {
    it('should call repository.createSingle', async () => {
      await service.createSingle([]);
      expect(repository.createSingle).toHaveBeenCalledTimes(1);
    });
  });

  describe('getByUser', () => {
    it('should call repository.getByUser', async () => {
      await service.getByUser('user-id');
      expect(repository.getByUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMany', () => {
    it('should call repository.getMany', async () => {
      await service.getMany();
      expect(repository.getMany).toHaveBeenCalledTimes(1);
    });
  });
});
