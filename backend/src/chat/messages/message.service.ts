import { Injectable } from '@nestjs/common';
import { Message, MessageDocument } from './message.schema';
import { CreateMessageDto } from './dto/message.dto';
import { Chat, ChatDocument } from '../chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  findAll(): Promise<Message[]> {
    //TODO relations not working
    return this.messageModel.find().populate('chat').exec();
  }

  findOne(id: string): Promise<Message> {
    return this.messageModel.findOne({ id: id }).exec();
  }

  createMessage(
    createMessageDto: CreateMessageDto,
    chat: ChatDocument,
  ): Promise<Message> {
    const createMessage = new this.messageModel({
      ...createMessageDto,
      created_at: new Date().toISOString(),
    });
    // createMessage.created_at = new Date().toISOString();
    createMessage.chat = chat._id;
    return createMessage.save();
  }

  async remove(id: string): Promise<void> {
    await this.messageModel.deleteOne({ id: id });
  }
}
