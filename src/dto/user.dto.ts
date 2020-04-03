import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistryDto {
  @ApiProperty({
    description: '用户名',
    example: 'chen',
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: '学号',
    example: 'B18030721',
  })
  @IsString()
  readonly studentId: string;

  @ApiProperty({
    description: '密码',
    example: 'root',
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: '邮箱',
    example: '749923710@qq.com',
  })
  @IsEmail()
  readonly email: string; // 邮箱没注册过就可以注册
}
