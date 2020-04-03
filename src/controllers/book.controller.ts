import {
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { BorrowDto, ReturnDto } from '../dto/book.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseJwtPayload, JwtPayload } from 'src/decorators/auth.decorator';
import { exception } from 'src/utils/result';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  listBook() {
    return this.bookService.listBook();
  }

  @Post('borrow')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  borrow(@Body() borrowDto: BorrowDto, @UseJwtPayload() payload: JwtPayload) {
    if (payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.bookService.borrow(borrowDto, payload.id);
  }

  @Post('giveBack')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  giveBack(@Body() returnDto: ReturnDto, @UseJwtPayload() payload: JwtPayload) {
    if (payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.bookService.giveBack(returnDto, payload.id);
  }
}
