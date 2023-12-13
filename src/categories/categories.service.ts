import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from '../database.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  createCategory(createCategoryDto: CreateCategoryDto) {
    const category = { id: uuid(), ...createCategoryDto };
    return this.databaseService.createEntity('categories[]', category);
  }

  getAllCategories() {
    return this.databaseService.getEntities('categories');
  }
}
