import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number
  ):Promise<Task> {
    return await this.tasksService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: number, @Body() updateTaskStatus: UpdateTaskStatusDto): Promise<Task> {
    const {status} = updateTaskStatus;
    return await this.tasksService.updateStatus(id, status);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.tasksService.remove(id);
  }
}
