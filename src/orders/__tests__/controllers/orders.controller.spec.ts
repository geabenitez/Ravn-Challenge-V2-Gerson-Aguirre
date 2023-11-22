import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../../controllers/orders.controller';
import { OrdersService } from '../../services/orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            getMany: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOrders', () => {
    it('should call service.getOrders', async () => {
      await controller.getOrders();
      expect(service.getMany).toHaveBeenCalledTimes(1);
    });
  });
});
