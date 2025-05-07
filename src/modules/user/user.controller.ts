import { Controller, UseGuards, Body, Param, Get, Post, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from './../auth/guards';
import { Roles } from '../auth/decorators';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './types';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles("Administrativo")
  @Get('')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Post('')
  async saveUser(@Body() user: UserDto): Promise<number> {
    return await this.userService.saveUser(user);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() user: UserDto,
  ): Promise<void> {
    return await this.userService.updateUser(userId, user);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    return await this.userService.deleteUser(userId);
  }
}
