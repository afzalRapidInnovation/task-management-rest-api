import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if(Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id:string): Task {
    return this.taskService.getTaskById(id);
  }
  

  @Post()
  createTasks(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTasks(createTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string): void {
    this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id:string, @Body('status') status: TaskStatus,):Task {
    return this.taskService.updateTaskStatus(id, status);
  }

}
