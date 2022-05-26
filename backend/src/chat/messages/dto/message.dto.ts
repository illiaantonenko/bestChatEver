import { ObjectID } from 'typeorm';

export class CreateMessageDto {
  _id: ObjectID;
  body: string;
  created_at: string;
}
