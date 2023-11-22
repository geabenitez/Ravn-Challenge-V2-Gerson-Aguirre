import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../../../users/repositories/users.repository';
import { UsersCartService } from '../../../users/services/users.cart.service';
import { AuthProcessSignUpRequest } from '../../_types/auth.types';
import { AuthService } from '../../services/auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: UsersRepository;
  let usersCartService: UsersCartService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: {
            getSinglByUsername: jest.fn().mockResolvedValue({
              id: 'id',
              password: 'password',
            }),
            create: jest.fn().mockResolvedValue({ id: 'id' }),
          },
        },
        {
          provide: UsersCartService,
          useValue: {
            deleteByUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    usersCartService = module.get<UsersCartService>(UsersCartService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processSignIn', () => {
    beforeEach(async () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
      const payload = { username: 'gfring', password: '123456789' };
      await service.processSignIn(payload);
    });

    it('should call usersRepository.getSinglByUsername', async () => {
      expect(usersRepository.getSinglByUsername).toHaveBeenCalledTimes(1);
    });

    it('should call jwtService.sign', async () => {
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
    });
  });

  describe('processSignUp', () => {
    it('should call usersRepository.create', async () => {
      const payload: AuthProcessSignUpRequest = {
        username: 'gfring',
        password: '123456789',
      };
      await service.processSignUp(payload);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('processSignOut', () => {
    it('should call usersCartService.deleteByUser', async () => {
      await service.processSignOut('id');
      expect(usersCartService.deleteByUser).toHaveBeenCalledTimes(1);
    });
  });
});
