import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../categories.service';
import { DatabaseService } from '../../database.service';
import { v4 as uuid } from 'uuid';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const mockedDatabaseService = {
    createEntity: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: DatabaseService, useValue: mockedDatabaseService },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create a category', () => {
      const category = { name: 'mock category' };
      const createdCategory = { id: uuid(), ...category };
      mockedDatabaseService.createEntity.mockReturnValue(createdCategory);

      expect(service.createCategory(category)).toEqual(createdCategory);
      expect(mockedDatabaseService.createEntity).toHaveBeenCalledWith(
        'categories[]',
        {
          id: expect.any(String),
          ...category,
        },
      );
    });
  });
});
