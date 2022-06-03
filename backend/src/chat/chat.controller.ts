import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './messages/dto/message.dto';
import { Message } from './messages/message.schema';
import { MessageService } from './messages/message.service';
import { Chat, ChatDocument } from './chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    @InjectModel(Chat.name)
    private readonly chatModel: Model<ChatDocument>,
  ) {}

  @Get()
  async room(): Promise<Message[]> {
    const messages = await this.messageService.findAll();
    return messages;
  }

  @Post()
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    const chat = await this.chatModel.findOne();
    return this.messageService.createMessage(createMessageDto, chat);
  }

  @Post('create-room')
  async createRoom() {
    return this.chatService.createRoom();
  }
}
