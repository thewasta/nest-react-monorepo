import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty({
        message: 'Message is required'
    })
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    done: boolean;
}