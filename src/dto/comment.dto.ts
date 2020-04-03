import { IsString, IsNumber } from 'class-validator';
export class GetCommentDto {
  @IsNumber()
  readonly id: number; // 书本id
}
export class CommentBookDto {
  @IsString()
  readonly text: string;

  @IsNumber()
  readonly id: number;
}

export class SubCommentDto {
  @IsString()
  readonly text: string;

  @IsNumber()
  readonly id: number;
}
