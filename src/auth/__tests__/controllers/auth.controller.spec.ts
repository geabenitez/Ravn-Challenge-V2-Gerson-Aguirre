import { Test, TestingModule } from '@nestjs/testing';
import { AuthProcessSignInRequest } from '../../_types/auth.types';
import { AuthController } from '../../controllers/auth.controller';
import { AuthService } from '../../services/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            processSignIn: jest.fn(),
            processSignUp: jest.fn(),
            processSignOut: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('processSignIn', () => {
    it('should call service.processSignIn', async () => {
      const payload: AuthProcessSignInRequest = {
        username: 'gfring',
        password: '123456789',
      };
      await controller.processSignIn(payload);
      expect(service.processSignIn).toHaveBeenCalledTimes(1);
    });
  });

  describe('processSignUp', () => {
    it('should call service.processSignUp', async () => {
      const payload: AuthProcessSignInRequest = {
        username: 'gfring',
        password: '123456789',
      };
      await controller.processSignUp(payload);
      expect(service.processSignUp).toHaveBeenCalledTimes(1);
    });
  });

  describe('processSignOut', () => {
    it('should call service.processSignOut', async () => {
      const user = 'user-id';
      await controller.processSignOut(user);
      expect(service.processSignOut).toHaveBeenCalledTimes(1);
    });
  });
});
