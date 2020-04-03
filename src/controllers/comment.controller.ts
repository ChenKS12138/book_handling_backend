import {
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import {
  CommentBookDto,
  SubCommentDto,
  GetCommentDto,
} from '../dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseJwtPayload, JwtPayload } from 'src/decorators/auth.decorator';
import { exception } from 'src/utils/result';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOkResponse({ description: '成功获取该书的评论' })
  @Get('get')
  @UsePipes(ValidationPipe)
  getComment(@Query() getCommentDto: GetCommentDto) {
    return this.commentService.getComment(getCommentDto);
  }

  @ApiOkResponse({ description: '成功对书进行评论' })
  @ApiUnauthorizedResponse({ description: '提示需要先以用户身份登陆' })
  @Post('book')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  commentBook(
    @Body() commentBookDto: CommentBookDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.commentService.commentBook(commentBookDto, payload.id);
  }

  @ApiOkResponse({ description: '成功对评论进行评论' })
  @ApiUnauthorizedResponse({ description: '提示需要先以用户身份登陆' })
  @Post('subComment')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  subComment(
    @Body() subCommentDto: SubCommentDto,
    @UseJwtPayload() payload: JwtPayload,
  ) {
    if (payload.isAdmin) return exception.PERMISSION_DENIED;
    return this.commentService.subComment(subCommentDto, payload.id);
  }
}
