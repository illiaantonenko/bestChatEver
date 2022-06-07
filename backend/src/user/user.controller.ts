import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  userList(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  user(@Param('id') id: ObjectId): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  insert(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId): string {
    if (this.userService.delete(id)) {
      return 'success';
    }
    return 'error';
  }
}
