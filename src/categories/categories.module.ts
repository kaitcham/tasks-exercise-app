import { Module } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { UniqueValidator } from '../tasks/unique-validator';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, DatabaseService, UniqueValidator],
})
export class CategoriesModule {}
