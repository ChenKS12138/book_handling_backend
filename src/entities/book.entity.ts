import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

import { Comment } from './comment.entity';
import { Record } from './record.entity';

@Entity({ name: 'book' })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  totalCount: number;

  @OneToMany(
    type => Comment,
    comment => comment.book,
  )
  comments: Array<Comment>;

  @ManyToMany(
    type => Record,
    record => record.book,
  )
  @JoinColumn()
  records: Array<Record>;

  @CreateDateColumn({ type: 'date' })
  createAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updateAt: Date;
}
