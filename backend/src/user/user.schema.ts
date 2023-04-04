import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Chat } from 'src/chat/chat.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  // TODO: create abstract generic class that will encapsulate common fields (like: _id, createAt, etc)
  @Transform((value) => value.obj._id.toString())
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop()
  @Exclude()
  public refreshToken: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  })
  chatList: Chat[];
}

export const UserSchema = SchemaFactory.createForClass(User);
