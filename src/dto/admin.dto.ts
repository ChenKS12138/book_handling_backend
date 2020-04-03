import { IsString, IsNumber } from 'class-validator';
export class AddBookDto {
  @IsString()
  readonly bookName: string;

  @IsString()
  readonly author: string;

  @IsNumber()
  readonly totalCount: number;
}

export class DeleteBookDto {
  @IsNumber()
  readonly id: number;
}

export class EditBookDto {
  @IsString()
  readonly bookName: string;

  @IsString()
  readonly author: string;

  @IsNumber()
  readonly totalCount: number;

  @IsNumber()
  readonly id: number;
}
