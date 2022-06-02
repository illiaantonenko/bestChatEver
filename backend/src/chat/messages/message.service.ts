import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../chat.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  findAll(): Promise<Message[]> {
    //TODO relations not working
    return this.messageRepository.find();
  }

  findOne(id: string): Promise<Message> {
    return this.messageRepository.findOne(id);
  }

  createMessage(
    createMessageDto: CreateMessageDto,
    chat: Chat,
  ): Promise<Message> {
    const message = new Message();
    message.body = createMessageDto.body;
    message.created_at = new Date().toISOString();
    message.chat = chat;
    return this.messageRepository.save(message);
  }

  async remove(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
