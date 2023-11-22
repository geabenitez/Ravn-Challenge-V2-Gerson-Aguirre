import { Test, TestingModule } from '@nestjs/testing';
import { UsersOrdersController } from '../../controllers/users.orders.controller';
import { UsersOrdersService } from '../../services/users.orders.service';

describe('UsersOrdersController', () => {
  let controller: UsersOrdersController;
  let service: UsersOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersOrdersController],
      providers: [
        {
          provide: UsersOrdersService,
          useValue: {
            getOrders: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersOrdersController>(UsersOrdersController);
    service = module.get<UsersOrdersService>(UsersOrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOrders', () => {
    it('should call service.getOrders', async () => {
      await controller.getOrders('user-id');
      expect(service.getOrders).toHaveBeenCalledTimes(1);
    });
  });
});
