import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './messages/dto/message.dto';
import { Message } from './messages/message.entity';
import { MessageService } from './messages/message.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  @Get()
  async room(): Promise<Message[]> {
    const messages = await this.messageService.findAll();    
    messages.forEach((messages) => {
      console.log(messages.chat);
    });
    return messages;
  }

  @Post()
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    const chat = await this.chatRepository.findOne();
    return this.messageService.createMessage(createMessageDto, chat);
  }

  @Post('create-room')
  async createRoom() {
    return this.chatService.createRoom();
  }
}
