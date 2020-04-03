import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Comment } from './comment.entity';
import { Record } from './record.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  studentId: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(
    type => Comment,
    comment => comment.user,
  )
  comments: Array<Comment>;

  @OneToMany(
    type => Record,
    record => record.user,
  )
  records: Array<Record>;

  @CreateDateColumn({ type: 'date' })
  createAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updateAt: Date;
}
