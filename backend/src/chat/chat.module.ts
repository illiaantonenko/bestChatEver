import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Message, MessageSchema } from './messages/message.schema';
import { Chat, ChatSchema } from './chat.schema';
import { MessageService } from './messages/message.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [ChatService, MessageService],
  controllers: [ChatController],
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
  ],
})
export class ChatModule {}
