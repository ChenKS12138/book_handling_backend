import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

export const NULL_COMMENT = -1;

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string; // 评论内容

  @ManyToOne(
    type => Book,
    book => book.comments,
  )
  @JoinColumn()
  book: Book;

  @ManyToOne(
    type => User,
    user => user.comments,
  )
  @JoinColumn()
  user: User;

  @Column()
  referedCommentId: number;

  @CreateDateColumn({ type: 'date' })
  createAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updateAt: Date;
}
