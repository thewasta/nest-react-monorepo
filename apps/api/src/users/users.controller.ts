import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import {JwtGuard} from "../auth/jwt.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUser(){
    return this.usersService.getAll()
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  getMyUser(@Param('id') id: string) {
    return this.usersService.getUser(id)
  }
}
