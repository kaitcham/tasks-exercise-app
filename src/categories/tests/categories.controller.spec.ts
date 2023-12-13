import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../categories.controller';
import { CategoriesService } from '../categories.service';
import { v4 as uuid } from 'uuid';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  const mockedCategoriesService = {
    createCategory: jest.fn(),
    getAllCategories: jest.fn(),
  };

  const category = { name: 'test' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    })
      .overrideProvider(CategoriesService)
      .useValue(mockedCategoriesService)
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should create a category', () => {
    mockedCategoriesService.createCategory.mockReturnValue({
      id: uuid(),
      ...category,
    });
    expect(controller.create(category)).toEqual({
      id: expect.any(String),
      ...category,
    });
  });

  it('should return [] if there is no category', () => {
    mockedCategoriesService.getAllCategories.mockReturnValue([]);
    expect(controller.findAll()).toEqual([]);
  });

  it('should return all categories', () => {
    mockedCategoriesService.getAllCategories.mockReturnValue([
      { id: uuid(), ...category },
    ]);
    controller.create(category);
    expect(controller.findAll()).toEqual([
      { id: expect.any(String), ...category },
    ]);
  });
});
