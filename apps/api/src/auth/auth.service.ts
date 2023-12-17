import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AuthDto} from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response} from "express";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {
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

    async signin(dto: AuthDto, res: Response) {
        const foundUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!foundUser) {
            throw new BadRequestException('User not found');
        }

        await this.comparePassword(foundUser.hashedPassword, dto.password)
        const payload = {
            sub: dto.email
        }

        let accessToken = await this.jwtService.signAsync(payload);
        res.cookie('token', accessToken)
        return res.send({message: 'User sign in successfully'})
    }

    async signout() {
        return {message: 'signout success'}
    }

    async hashPassword(password: string) {
        const saltOrRound = 10;
        return await bcrypt.hash(password, saltOrRound);
    }

    async comparePassword(hashed: string, plainPassword: string): Promise<void> {
        const isMatch = await bcrypt.compare(plainPassword, hashed);
        if (!isMatch) {
            throw new UnauthorizedException('Email or password wrong')
        }
    }
}
