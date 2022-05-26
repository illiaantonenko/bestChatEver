import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './messages/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}
  // private readonly messages: IMessage[] = [];

  findAll(): Promise<MessageEntity[]> {
    return this.messageRepository.find();
  }

  findOne(id: string): Promise<MessageEntity> {
    return this.messageRepository.findOne(id);
  }

  async createMessage(message: MessageEntity) {
    await this.messageRepository.insert(message);
  }

  async remove(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
