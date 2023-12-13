import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, CategoriesModule],
})
export class AppModule {}
