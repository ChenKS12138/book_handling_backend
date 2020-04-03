import {
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Param,
  Body,
  UseGuards,
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

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('get')
  @UsePipes(ValidationPipe)
  getComment(@Param() getCommentDto: GetCommentDto) {
    return this.commentService.getComment(getCommentDto);
  }

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
