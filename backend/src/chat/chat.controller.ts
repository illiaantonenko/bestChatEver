import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './messages/dto/message.dto';
import { MessageEntity } from './messages/message.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async room(): Promise<MessageEntity[]> {
    return this.chatService.findAll();
  }

  @Post()
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.chatService.createMessage(createMessageDto);
  }
}
