import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Book } from './book.entity';

export const RECORD_STATUS = {
  LEND: 0,
  RETURN: 1,
};
export type RecordStatus = 0 | 1;

@Entity({ name: 'record' })
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user.records,
  )
  @JoinColumn()
  user: User;

  @ManyToOne(
    type => Book,
    book => book.records,
  )
  @JoinColumn()
  book: Book;

  @Column()
  statusCode: number;

  @CreateDateColumn({ type: 'date' })
  createAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updateAt: Date;
}
