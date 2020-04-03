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
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOkResponse({ description: '管理员获取所有的借阅记录' })
  @ApiUnauthorizedResponse({ description: '提示需要先使用管理员账号登陆' })
  @Get('getRecord')
  @UseGuards(AuthGuard())
  getRecord(@UseJwtPayload() payload: JwtPayload) {
    if (!payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.adminService.getRecord();
  }

  @ApiOkResponse({ description: '管理员成功添加新书目' })
  @ApiUnauthorizedResponse({ description: '提示需要先使用管理员账号登陆' })
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

  @ApiOkResponse({ description: '管理员成功修改书目信息' })
  @ApiUnauthorizedResponse({ description: '提示需要先使用管理员账号登陆' })
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

  @ApiOkResponse({ description: '管理员成功删除书目' })
  @ApiUnauthorizedResponse({ description: '提示需要先使用管理员账号登陆' })
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
