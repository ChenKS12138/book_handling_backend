import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddBookDto {
  @ApiProperty({
    description: '书本名称',
    example: "《You Don't Know JS》",
  })
  @IsString()
  readonly bookName: string;

  @ApiProperty({
    description: '书本作者',
    example: 'Kyle Simpson',
  })
  @IsString()
  readonly author: string;

  @ApiProperty({
    description: '书本的总库存数',
    example: 20,
  })
  @IsNumber()
  readonly totalCount: number;
}

export class DeleteBookDto {
  @ApiProperty({
    description: '需要删除的书的id',
    example: 1,
  })
  @IsNumber()
  readonly id: number;
}

export class EditBookDto {
  @ApiProperty({
    description: '书本名称',
    example: "《You Don't Know JS》",
  })
  @IsString()
  readonly bookName: string;

  @ApiProperty({
    description: '书本作者',
    example: 'Kyle Simpson',
  })
  @IsString()
  readonly author: string;

  @ApiProperty({
    description: '书本的总库存数',
    example: 20,
  })
  @IsNumber()
  readonly totalCount: number;

  @ApiProperty({
    description: '需要删除的书的id',
    example: 1,
  })
  @IsNumber()
  readonly id: number;
}
