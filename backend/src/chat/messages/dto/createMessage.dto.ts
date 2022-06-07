import { ObjectId } from 'mongoose';

export class CreateMessageDto {
  body: string;

  author: ObjectId;

  chat: ObjectId;
}
