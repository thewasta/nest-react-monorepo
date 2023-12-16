import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TasksService} from "../tasks.service";
import {CreateTaskDto} from "../dto/createTask.dto";
import {UpdateTaskDto} from "../dto/updateTask.dto";


@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(id);
    }

    @Post()
    create(@Body() body: CreateTaskDto) {
        return this.taskService.create(body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.taskService.delete(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
        return this.taskService.update(id, body);
    }
}
