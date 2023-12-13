import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../../database.service';
import { CreateTaskDto, TaskStatus } from '../dto/create-task.dto';
import { TasksService } from '../tasks.service';

describe('TasksService', () => {
  let taskService: TasksService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, DatabaseService],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('createTask', () => {});

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks = await taskService.getAllTasks();
      expect(Array.isArray(tasks)).toBeTruthy();
    });

    it('should return tasks from the database', async () => {
      const tasks = await taskService.getAllTasks();
      const dbTasks = await databaseService.getEntities('tasks');
      expect(tasks).toEqual(dbTasks);
    });
  });
});
