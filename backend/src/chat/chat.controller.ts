import { Controller, Get } from '@nestjs/common';
// import { IMessage } from '../../../common/message.interface';

@Controller('chat')
export class ChatController {
  @Get()
  room(): object[] {
    return [
      {
        id: '1',
        body: 'hello',
        created_at: new Date(new Date().getTime() - 60000).toTimeString(),
      },
      {
        id: '2',
        body: 'how are you?',
        created_at: new Date().toTimeString(),
      },
    ];
  }
}
