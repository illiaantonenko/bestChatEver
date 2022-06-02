import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages/message.entity';
import { Chat } from './chat.entity';
import { MessageService } from './messages/message.service';

@Module({
  providers: [ChatService, MessageService],
  controllers: [ChatController],
  imports: [TypeOrmModule.forFeature([Message, Chat])],
  exports: [TypeOrmModule],
})
export class ChatModule {}
