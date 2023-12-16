import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {TasksService} from "../tasks.service";

@Schema({
    timestamps: true
})
class Task {
    @Prop({
        unique: true,
        required: true,
        trim: true
    })
    title: string

    @Prop({
        required: true,
        trim: true
    })
    description: string

    @Prop({
        required: true
    })
    done: boolean
}

export const TaskSchema = SchemaFactory.createForClass(Task);