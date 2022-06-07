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
    return this.chatModel.find().exec();
  }

  findOne(id: ObjectId): Promise<Chat> {
    return this.chatModel.findOne({ id: id }).exec();
  }

  async createRoom(): Promise<Chat> {
    const createChat = new this.chatModel();
    return createChat.save();
  }

  async remove(id: ObjectId): Promise<void> {
    await this.chatModel.deleteOne({ id: id });
  }
}
