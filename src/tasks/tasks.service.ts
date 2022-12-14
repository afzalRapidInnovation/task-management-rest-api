import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model'
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if(status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if(search) {
      tasks = tasks.filter( (task) => {
        if(task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search)) {
          return true;
        } else {
          return false;
        }
      })
    }

    return tasks;
  }

  getTaskById(id:string): Task {
    return this.tasks.find( (task) => task.id === id);
  }

  createTasks(createTaskDto: CreateTaskDto): Task {
    const { title, description, finishedBy} = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      finishedBy,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) :void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id:string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
