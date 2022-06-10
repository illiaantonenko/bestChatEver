import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { SignUpLocalDto } from '../auth/dto/signUpLocal.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findMany(where: FilterQuery<User>): Promise<User[]> {
    const userList = await this.userModel.find(where).exec();

    if (!userList) {
      throw new NotFoundException(
        `There isn't any user with identifier: ${where}`,
      );
    }
    return userList;
  }

  async findOne(where: FilterQuery<UserDocument>): Promise<User> {
    const user = await this.userModel.findOne(where).exec();

    if (!user) {
      throw new NotFoundException(
        `There isn't any user with identifier: ${where}`,
      );
    }
    return user;
  }

  create(signUpUserDto: SignUpLocalDto): Promise<User> {
    const createUser = new this.userModel(signUpUserDto);
    return createUser.save();
  }

  update() {
    // TODO implement update user
  }

  async delete(id: ObjectId): Promise<void> {
    await this.userModel.deleteOne({ id: id }).exec();
  }
}
