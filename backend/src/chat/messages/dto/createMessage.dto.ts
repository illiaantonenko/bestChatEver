import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateMessageDto {
  @IsNotEmpty()
  body: string;

  author: ObjectId;

  chat: ObjectId;
}
