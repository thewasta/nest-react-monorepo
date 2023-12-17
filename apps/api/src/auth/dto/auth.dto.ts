import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20, {
        message: 'Password must to be at between 6 and 20 characters'
    })
    public password: string;
}