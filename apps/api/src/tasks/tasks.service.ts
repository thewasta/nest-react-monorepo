import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Task} from "./schema/task.schema";
import {Model} from "mongoose";
import {CreateTaskDto} from "./dto/createTask.dto";
import {UpdateTaskDto} from "./dto/updateTask.dto";

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {
    }

    findAll() {
        return this.taskModel.find();
    }

    async create(createTask: CreateTaskDto): Promise<Task> {
        const newTask = new this.taskModel(createTask);
        await newTask.save()
        return newTask;
    }

    async findOne(id: string): Promise<Task> {
        return this.taskModel.findOne({_id: id});
    }

    async delete(id: string): Promise<object> {
        return this.taskModel.deleteOne({_id: id});
    }

    async update(id: string, task: UpdateTaskDto): Promise<Task> {
        return this.taskModel.findOneAndUpdate({_id: id}, task, {new: true})
    }
}
