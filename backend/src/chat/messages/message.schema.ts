import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Chat } from '../chat.schema';

export type MessageDocument = Message & Document;
@Schema()
export class Message {
  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  created_at: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' })
  chat: Chat;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
