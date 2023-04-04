import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Query } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { Message, MessageDocument } from './messages/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  //TODO: research for query type
  findAll(): Query<any, any> {
    return this.chatModel.find();
  }

  findOne(id: ObjectId): Query<any, any> {
    return this.chatModel.findOne({ id: id });
  }

  create(participantList: ObjectId[]): Promise<Chat> {
    return new this.chatModel({ participantList }).save();
  }

  async delete(id: ObjectId): Promise<void> {
    await this.chatModel.deleteOne({ id: id });
  }

  async addLastMessage(chatList: Chat[]): Promise<Chat[]> {
    const promiseList = chatList.map((chat) => {
      return this.messageModel
        .find({ chat: chat._id })
        .sort({ createdAt: 'desc' })
        .limit(1)
        .exec();
    });

    const result = await Promise.all(promiseList);
    return result.map((messageList, index) => {
      chatList[index].messageList = messageList;
      return chatList[index];
    });
  }
}
