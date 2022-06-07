import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/user.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
  })
  partisipants: User[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
