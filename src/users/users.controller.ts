import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dtos/userRegister.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async registerUser(@Body() user: RegisterUserDto) {
    const data = await this.userService.registerUser(user);
    return data;
  }
}
