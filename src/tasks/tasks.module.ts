import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseService } from '../database.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, DatabaseService],
})
export class TasksModule {}
