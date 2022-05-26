import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './messages/message.entity';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  exports: [TypeOrmModule],
})
export class ChatModule {}
