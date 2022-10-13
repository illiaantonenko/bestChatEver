import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilterQuery, ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { SignUpLocalDto } from '../auth/dto/signUpLocal.dto';
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  user(@Param('id') id: ObjectId): Promise<User> {
    return this.userService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getAuthUser(@Request() req): Promise<User> {
    return req.user;
  }

  @Get('query')
  searchQuery(@Body() where: FilterQuery<User>): Promise<User> {
    return this.userService.findOne(where);
  }

  @Post()
  insert(@Body() createUserDto: SignUpLocalDto): Promise<User> {
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
