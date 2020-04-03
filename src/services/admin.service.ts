import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { Record } from '../entities/record.entity';
import { AddBookDto, DeleteBookDto, EditBookDto } from '../dto/admin.dto';
import { success, exception } from '../utils/result';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}
  async getRecord() {
    const allRecord = this.recordRepository.find();
    return success(allRecord);
  }
  async addBook(addBookDto: AddBookDto) {
    const { author, bookName, totalCount } = addBookDto;
    const book = new Book();
    book.author = author;
    book.name = bookName;
    book.totalCount = totalCount;
    await this.bookRepository.save(book);
    return success(true);
  }
  async editBook(editBookDto: EditBookDto) {
    const { author, bookName, id, totalCount } = editBookDto;
    const targetBook = await this.bookRepository.findOne({ where: { id } });
    if (!targetBook) return exception.PARAMS_INVALID;
    targetBook.author = author;
    targetBook.name = bookName;
    targetBook.totalCount = totalCount;
    await this.bookRepository.save(targetBook);
    success(true);
  }
  async delteBook(deleteBookDto: DeleteBookDto) {
    const { id } = deleteBookDto;
    const targetBook = await this.bookRepository.findOne({ where: { id } });
    if (!targetBook) return exception.PARAMS_INVALID;
    await this.bookRepository.delete(id);
    success(true);
  }
}
