import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {TasksService} from "../tasks.service";
import {CreateTaskDto} from "../dto/createTask.dto";
import {UpdateTaskDto} from "../dto/updateTask.dto";
import {ConflictException} from "@nestjs/common/exceptions/conflict.exception";
import {NotFoundException} from "@nestjs/common/exceptions/not-found.exception";


@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const currentTask = await this.taskService.findOne(id);
            if (!currentTask) {
                throw new NotFoundException('Task not found');
            }
            return currentTask;

        } catch (error) {
            if (error.message.match('Cast to ObjectId')) {
                throw new NotFoundException('Task not found');
            }
            throw error;
        }
    }

    @Post()
    async create(@Body() body: CreateTaskDto) {
        try {
            return await this.taskService.create(body)
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Task already exist');
            }
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        try {
            const deletedTask = await this.taskService.delete(id);
            //@ts-ignore
            if (!deletedTask.deletedCount) {
                throw new NotFoundException('Task not found');
            }
            return deletedTask;

        } catch (error) {
            if (error.message.match('Cast to ObjectId') ||
                error.message === "Task not found") {
                throw new NotFoundException('Task not found');
            }
            throw error;
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
        try {
            const updated =  await this.taskService.update(id, body);
            if (!updated) {
                throw new NotFoundException('Task not found')
            }
            return updated
        } catch (error) {
            throw error;
        }

    }
}
