import { Column, Entity } from 'typeorm';
import { Base } from '@src/entities/BaseEntity';

@Entity()
export class User extends Base {
  @Column()
  userName: string;

  @Column()
  hash: string;
}
