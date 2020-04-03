import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: '注册使用的邮箱，管理员的邮箱为root@bh.com',
    example: 'root@bh.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: '账户密码',
    example: 'root',
  })
  @IsString()
  readonly password: string;
}
