import { Column, Entity, ObjectID, ObjectIdColumn, OneToOne } from 'typeorm';
import { Chat } from '../chat.entity';

@Entity()
export class Message {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  body: string;

  @Column()
  created_at: string;

  @OneToOne(() => Chat)
  chat: Chat;
}
