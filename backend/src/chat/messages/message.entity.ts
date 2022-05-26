import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class MessageEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  body: string;

  @Column()
  created_at: string;
}
