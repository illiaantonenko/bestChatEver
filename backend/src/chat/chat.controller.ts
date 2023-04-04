import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './messages/dto/createMessage.dto';
import { MessageService } from './messages/message.service';
import { ObjectId } from 'mongoose';
import { ChatListDto } from './dto/chatList.dto';
import { MessageListDto } from './messages/dto/messageList.dto';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  @Get()
  async allChats(): Promise<ChatListDto> {
    const chatList = await this.chatService
      .findAll()
      .populate('participantList')
      .exec();
    const res = await this.chatService.addLastMessage(chatList);
    return {
      chatList: res,
    };
  }

  @Get(':id')
  async room(@Param('id') id: ObjectId): Promise<MessageListDto> {
    const messageList = await this.messageService.findAllInChat(id);
    return { messageList };
  }

  @Post('create')
  async createRoom(@Body('participantList') participantList: ObjectId[]) {
    return this.chatService.create(participantList);
  }

  @Post('send')
  async sendMessage(@Body('message') createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }
}
