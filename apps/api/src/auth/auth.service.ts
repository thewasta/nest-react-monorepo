import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AuthDto} from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {
    }

    async signup(dto: AuthDto) {
        const foundUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (foundUser) {
            throw new BadRequestException('Email already taken');
        }

        const hashedPassword = await this.hashPassword(dto.password)
        await this.prisma.user.create({
            data: {
                email: dto.email,
                hashedPassword: hashedPassword
            }
        })
        return {message: 'Signup success', hashed: hashedPassword}
    }

    async signin() {
        return {message: 'signin success'}
    }

    async signout() {
        return {message: 'signout success'}
    }

    async hashPassword(password: string) {
        const saltOrRound = 10;
        return await bcrypt.hash(password, saltOrRound);
    }
}
