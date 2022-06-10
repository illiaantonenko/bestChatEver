import { IsDefined, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateMessageDto {
  @IsDefined()
  @IsNotEmpty()
  body: string;

  author: ObjectId;

  chat: ObjectId;
}
