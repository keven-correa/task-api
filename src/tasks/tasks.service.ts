import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './tasks-status';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const {title, description, categoryId} = createTaskDto;
    
     const newTask = this.taskRepository.create({
        title,
        description,
        status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(newTask)
    return newTask;
  }

  async findAll(): Promise<Task[]> {
    const query =  this.taskRepository.createQueryBuilder('tasks');
    const tasks = await query.getMany();
    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    const foundTask = await this.taskRepository.findOne({where: {id}});

    if(!foundTask){
      throw new NotFoundException(`The task with id:${id} not found.`);
    }
    return foundTask;
  }

  async update(id: number, updateTaskDto: CreateTaskDto): Promise<Task> {

    await this.taskRepository.update(id, updateTaskDto);
    const updated = await this.taskRepository.findOne({where: {id}});
    if (updated) {
      return updated;
    }

    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.findOne(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task
  }

  async remove(id: number) {
    const task = await this.taskRepository.delete(id);
    if(!task.affected){
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }else{
      throw new HttpException('Deleted', HttpStatus.OK)
    }
  }
}
