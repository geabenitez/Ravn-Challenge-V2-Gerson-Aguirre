import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../../../orders/services/orders.service';
import { UsersOrdersService } from '../../services/users.orders.service';

describe('UsersOrdersService', () => {
  let service: UsersOrdersService;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersOrdersService,
        {
          provide: OrdersService,
          useValue: {
            getByUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersOrdersService>(UsersOrdersService);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrders', () => {
    it('should call ordersService.getByUser', async () => {
      await service.getOrders('user-id');
      expect(ordersService.getByUser).toHaveBeenCalledTimes(1);
    });
  });
});
