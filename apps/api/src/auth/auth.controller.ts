import {Body, Controller, Post, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthDto} from "./dto/auth.dto";
import {Response} from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto, @Res() res: Response) {
        return this.authService.signin(dto, res);
    }

    @Post('signout')
    signout() {
        return this.authService.signout();
    }
}
