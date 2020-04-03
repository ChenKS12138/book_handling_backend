import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCommentDto {
  @ApiProperty({
    description: '书本id',
    // example: '',
  })
  @IsNumber()
  readonly id: number; // 书本id
}
export class CommentBookDto {
  @ApiProperty({
    description: '对书本进行评论的内容',
    example: '这是本好书',
  })
  @IsString()
  readonly text: string;

  @ApiProperty({
    description: '书本id',
    example: 1,
  })
  @IsNumber()
  readonly id: number;
}

export class SubCommentDto {
  @ApiProperty({
    description: '对评论进行评论的内容',
    example: '楼上说得有道理',
  })
  @IsString()
  readonly text: string;

  @ApiProperty({
    description: '所评论的评论的id',
    example: 1,
  })
  @IsNumber()
  readonly id: number;
}
