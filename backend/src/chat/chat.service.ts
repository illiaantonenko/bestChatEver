import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
  ) {}

  findAll(): Promise<Chat[]> {
    return this.chatModel.find().populate('partisipants').exec();
  }

  findOne(id: ObjectId): Promise<Chat> {
    return this.chatModel.findOne({ id: id }).exec();
  }

  createRoom(partisipants: ObjectId[]): Promise<Chat> {
    return new this.chatModel({
      partisipants: partisipants,
    }).save();
  }

  async remove(id: ObjectId): Promise<void> {
    await this.chatModel.deleteOne({ id: id });
  }
}
