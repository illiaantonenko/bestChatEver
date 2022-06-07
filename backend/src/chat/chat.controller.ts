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

  @Post(':id')
  async sendMessage(
    @Param('id') chatId: ObjectId,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.createMessage(createMessageDto, chatId);
  }

  @Post('create')
  async createRoom() {
    return this.chatService.createRoom();
  }
}
