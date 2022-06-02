import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  findAll(): Promise<Chat[]> {
    return this.chatRepository.find();
  }

  findOne(id: string): Promise<Chat> {
    return this.chatRepository.findOne(id);
  }

  async createRoom(): Promise<Chat> {
    const chat = new Chat();
    return this.chatRepository.save(chat);
  }

  async remove(id: string): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
