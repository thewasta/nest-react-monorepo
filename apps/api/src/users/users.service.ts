import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    getAll() {
        return this.prisma.user.findMany({
            select: {
                email: true,
                id: true
            }
        })
    }

    getUser(id: string) {
        return this.prisma.user.findUnique({
            where: {id},
            select: {
                email: true,
                id: true
            }
        })
    }
}
