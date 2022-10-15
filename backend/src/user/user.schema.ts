import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Exclude, Transform} from 'class-transformer';
import {Document, ObjectId} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  // TODO: create abstract generic class that will encapsulate common fields (like: _id, createAt, etc)
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
