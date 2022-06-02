import { Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Chat {
  @ObjectIdColumn()
  _id: ObjectID;
}
