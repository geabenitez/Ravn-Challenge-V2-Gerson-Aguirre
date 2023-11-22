import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../controllers/categories.controller';
import { CategoriesService } from '../../services/categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            getMany: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMany', () => {
    it('should call service.getMany', async () => {
      await controller.getMany();
      expect(service.getMany).toHaveBeenCalledTimes(1);
    });
  });
});
