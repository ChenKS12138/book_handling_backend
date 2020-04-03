import { IsNumber } from 'class-validator';
export class BorrowDto {
  @IsNumber()
  readonly id: number;
}
export class ReturnDto {
  @IsNumber()
  readonly id: number;
}
