import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findMany(where: FilterQuery<User>): Promise<UserDocument[]> {
    return this.userModel.find(where).exec();
  }

  async findOne(where: FilterQuery<UserDocument>): Promise<UserDocument> {
    return this.userModel.findOne(where).exec();
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    console.log(user);

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async delete(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async isPasswordMatch(passwort: string, hash: string): Promise<boolean> {
    return bcrypt.compare(passwort, hash);
  }
}
