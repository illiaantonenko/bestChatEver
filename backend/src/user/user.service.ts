import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: ObjectId): Promise<User> {
    return this.userModel.findOne({ id: id }).exec();
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  updateUser() {
    // TODO implement update user
  }

  async remove(id: ObjectId): Promise<void> {
    await this.userModel.deleteOne({ id: id }).exec();
  }
}
