import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {expiresIn: '1h'}
    })],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {
}
