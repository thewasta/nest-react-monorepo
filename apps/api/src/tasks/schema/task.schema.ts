import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Task {
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
        required: true,
        default: false
    })
    done: boolean
}

export const TaskSchema = SchemaFactory.createForClass(Task);