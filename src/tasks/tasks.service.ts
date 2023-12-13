import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from '../database.service';
import { CreateTaskDto, TaskStatus } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const task = {
      id: uuid(),
      ...createTaskDto,
      status: TaskStatus.OPEN,
    };

    // await this.assignTaskToCategory(task.id, createTaskDto.categoryId);
    return this.databaseService.createEntity('tasks[]', task);
  }

  getAllTasks() {
    return this.databaseService.getEntities('tasks');
  }

  getTaskById(id: string) {
    return this.databaseService.getEntity('tasks', id);
  }

  updateTask(id: string, createTaskDto: Partial<CreateTaskDto>) {
    return this.databaseService.updateEntity('tasks', id, createTaskDto);
  }

  deleteTask(id: string) {
    return this.databaseService.deleteEntity('tasks', id);
  }

  // before you create a task, you need to assign it to a category
  // async assignTaskToCategory(taskId: string, categoryId: string) {
  //   const category = (await this.databaseService.getEntity(
  //     'categories',
  //     categoryId,
  //   )) as { id: string; name: string; todoIds: string[] };

  //   const updatedCategory = {
  //     ...category,
  //     todoIds: [...category.todoIds, taskId],
  //   };

  //   // the updateEntiy involves many database operations, is there a way to make it atomic?
  //   await this.databaseService.updateEntity(
  //     'categories',
  //     categoryId,
  //     updatedCategory,
  //   );
  // }
}
