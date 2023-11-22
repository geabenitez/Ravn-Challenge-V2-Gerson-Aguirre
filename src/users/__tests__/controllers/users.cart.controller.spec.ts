import { Test, TestingModule } from '@nestjs/testing';
import { UsersCartController } from '../../controllers/users.cart.controller';
import { UsersCartService } from '../../services/users.cart.service';

describe('UsersCartController', () => {
  let controller: UsersCartController;
  let service: UsersCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersCartController],
      providers: [
        {
          provide: UsersCartService,
          useValue: {
            processAddition: jest.fn(),
            processPurchase: jest.fn(),
            getCart: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersCartController>(UsersCartController);
    service = module.get<UsersCartService>(UsersCartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('processAddition', () => {
    it('should call service.processAddition', async () => {
      const payload = {
        quantity: 10,
        productId: 'product-id',
      };
      await controller.processAddition('user-id', payload);
      expect(service.processAddition).toHaveBeenCalledTimes(1);
    });
  });

  describe('processPurchase', () => {
    it('should call service.processPurchase', async () => {
      await controller.processPurchase('user-id');
      expect(service.processPurchase).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCart', () => {
    it('should call service.getCart', async () => {
      await controller.getCart('user-id');
      expect(service.getCart).toHaveBeenCalledTimes(1);
    });
  });
});
