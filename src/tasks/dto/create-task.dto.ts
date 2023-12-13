import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNotEmpty({ message: 'Each task must belong to a category!' })
  categoryId: string;
}
