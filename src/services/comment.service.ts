import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { Comment, NULL_COMMENT } from '../entities/comment.entity';
import { User } from '../entities/user.entity';

import {
  CommentBookDto,
  SubCommentDto,
  GetCommentDto,
} from '../dto/comment.dto';
import { exception, success } from 'src/utils/result';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getComment(getCommentDto: GetCommentDto) {
    const { id } = getCommentDto;
    const book = await this.bookRepository.findOne({ where: { id } });
    const comments = await this.commentRepository.find({
      where: { book },
      relations: ['user'],
    });
    const filteredComments = comments.map(comment => {
      const { user, ...rest } = comment;
      const { name, studentId, email, id } = user;
      const newUser = { name, studentId, email, id };
      return { user: newUser, ...rest };
    });
    return success({ comments: filteredComments });
  }
  async commentBook(commentBookDto: CommentBookDto, userId: number) {
    const { id, text } = commentBookDto;
    const book = await this.bookRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !book) return exception.PARAMS_INVALID;
    const comment = new Comment();
    comment.book = book;
    comment.text = text;
    comment.user = user;
    comment.referedCommentId = NULL_COMMENT;
    await this.commentRepository.save(comment);
    return success(true);
  }
  async subComment(subCommentDto: SubCommentDto, userId: number) {
    const { id, text } = subCommentDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return exception.PARAMS_INVALID;

    let currentComment = await this.getCommentById(id);
    while (currentComment && currentComment.referedCommentId !== NULL_COMMENT) {
      currentComment = await this.getCommentById(
        currentComment.referedCommentId,
      );
    }
    if (!currentComment) return exception.PARAMS_INVALID;
    const book = currentComment.book;
    const comment = new Comment();
    comment.book = book;
    comment.referedCommentId = id;
    comment.user = user;
    comment.text = text;
    await this.commentRepository.save(comment);
    return success(true);
  }
  private async getCommentById(id: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id } });
  }
}
