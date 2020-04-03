import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BorrowDto {
  @ApiProperty({
    description: '借阅的书本的id',
    example: '1',
  })
  @IsNumber()
  readonly id: number;
}
export class ReturnDto {
  @ApiProperty({
    description: '归还的书本的id',
    example: '1',
  })
  @IsNumber()
  readonly id: number;
}
