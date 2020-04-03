import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { Record, RECORD_STATUS } from '../entities/record.entity';
import { User } from '../entities/user.entity';
import { BorrowDto, ReturnDto } from '../dto/book.dto';
import { success, exception } from 'src/utils/result';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async listBook() {
    const books = await this.bookRepository.find({
      select: ['id', 'name', 'author', 'totalCount', 'createAt', 'updateAt'],
    });
    const booksWithStatus = await Promise.all(
      books.map(async book => {
        const [
          releventLendRecords,
          lendingCount,
        ] = await this.recordRepository.findAndCount({
          where: { book, statusCode: RECORD_STATUS.LEND },
        });
        return { lendingCount, ...book };
      }),
    );

    return success({ books: booksWithStatus });
  }
  async borrow(borrowDto: BorrowDto, userId: number) {
    const { id: bookId } = borrowDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book || !user) return exception.PARAMS_INVALID;
    const record = new Record();
    record.user = user;
    record.book = book;
    record.statusCode = RECORD_STATUS.LEND;
    await this.recordRepository.save(record);
    return success(true);
  }
  async giveBack(returnDto: ReturnDto, userId: number) {
    const { id } = returnDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return exception.PARAMS_INVALID;
    const targetRecord = await this.recordRepository.findOne({
      where: { id, user },
    });
    if (!user) return exception.PARAMS_INVALID;
    targetRecord.statusCode = RECORD_STATUS.RETURN;
    return success(true);
  }
}
