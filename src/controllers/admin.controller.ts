import {
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AddBookDto, DeleteBookDto, EditBookDto } from '../dto/admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload, UseJwtPayload } from 'src/decorators/auth.decorator';
import { exception } from 'src/utils/result';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('getRecord')
  @UseGuards(AuthGuard())
  getRecord(@UseJwtPayload() payload: JwtPayload) {
    if (!payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.adminService.getRecord();
  }

  @Post('addBook')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  addBook(
    @Body() addBookDto: AddBookDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (!payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.adminService.addBook(addBookDto);
  }

  @Post('editBook')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  editBook(
    @Body() editBookDto: EditBookDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (!payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.adminService.editBook(editBookDto);
  }

  @Post('deleteBook')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  deleteBook(
    @Body() deleteBookDto: DeleteBookDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (!payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.adminService.delteBook(deleteBookDto);
  }
}
