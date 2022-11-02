import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { FilterQuery } from 'mongoose';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  userList(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getAuthUser(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AccessTokenGuard)
  @Get('query')
  searchQuery(@Body() where: FilterQuery<User>): Promise<User> {
    return this.userService.findOne(where);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  user(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  insert(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
