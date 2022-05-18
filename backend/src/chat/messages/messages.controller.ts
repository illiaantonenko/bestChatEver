import { Body, Controller, Post } from '@nestjs/common';
// import { IMessage } from '../../../../common/message.interface';

@Controller('messages')
export class MessagesController {
  @Post('create')
  create(@Body() body: string): object {
    return {
      id: new Date().toISOString(),
      body: body,
      created_at: new Date().toTimeString(),
    };
  }
}
