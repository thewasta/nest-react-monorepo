import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    done?: boolean;
}