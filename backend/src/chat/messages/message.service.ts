import { Injectable } from '@nestjs/common';
import { Message, MessageDocument } from './message.schema';
import { CreateMessageDto } from './dto/createMessage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  findAllInChat(id: ObjectId): Promise<Message[]> {
    return this.messageModel.find({ owner: id }).exec();
  }

  findOne(id: ObjectId): Promise<Message> {
    return this.messageModel.findOne({ id: id }).exec();
  }

  createMessage(
    createMessageDto: CreateMessageDto,
    chatId: ObjectId,
  ): Promise<Message> {
    const createMessage = new this.messageModel({
      ...createMessageDto,
      chat: chatId,
    });

    return createMessage.save();
  }

  async remove(id: ObjectId): Promise<void> {
    await this.messageModel.deleteOne({ id: id });
  }
}
