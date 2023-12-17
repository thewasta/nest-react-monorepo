import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {
    }

    async signup() {
        return {message: 'Signup success'}
    }

    async signin() {
        return {message: 'signin success'}
    }

    async signout() {
        return {message: 'signout success'}
    }
}
