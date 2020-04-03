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
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  @ApiOkResponse({ description: '获取书目列表' })
  listBook() {
    return this.bookService.listBook();
  }

  @ApiOkResponse({ description: '成功借阅图书' })
  @ApiUnauthorizedResponse({ description: '提示需要先以用户身份登陆' })
  @Post('borrow')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  borrow(@Body() borrowDto: BorrowDto, @UseJwtPayload() payload: JwtPayload) {
    if (payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.bookService.borrow(borrowDto, payload.id);
  }

  @ApiOkResponse({ description: '成功归还图书' })
  @ApiUnauthorizedResponse({ description: '提示需要先以用户身份登陆' })
  @Post('giveBack')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  giveBack(@Body() returnDto: ReturnDto, @UseJwtPayload() payload: JwtPayload) {
    if (payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.bookService.giveBack(returnDto, payload.id);
  }
}
