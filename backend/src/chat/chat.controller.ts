import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './messages/dto/createMessage.dto';
import { Message } from './messages/message.schema';
import { MessageService } from './messages/message.service';
import { Chat } from './chat.schema';
import { ObjectId } from 'mongoose';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  @Get()
  async allChats(): Promise<Chat[]> {
    return this.chatService.findAll();
  }

  @Get(':id')
  async room(@Param('id') id: ObjectId): Promise<Message[]> {
    return await this.messageService.findAllInChat(id);
  }

  @Post('create')
  async createRoom(@Body() partisipants: ObjectId[]) {
    return this.chatService.create(partisipants);
  }

  @Post('send')
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }
}
