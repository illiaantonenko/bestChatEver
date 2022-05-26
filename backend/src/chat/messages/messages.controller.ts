import { Body, Controller, Post } from '@nestjs/common';
import { IMessage } from './interfaces/message.interface';

@Controller('messages')
export class MessagesController {
  @Post('create')
  create(@Body() body: string): IMessage {
    return {
      id: new Date().toISOString(),
      body: body,
      created_at: new Date().toTimeString(),
    };
  }
}
