import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Message } from './messages/message.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Transform((value) => value.obj._id.toString())
  _id: string;
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
  })
  participantList: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  })
  messageList?: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
