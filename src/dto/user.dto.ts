import { IsString, IsEmail } from 'class-validator';
export class RegistryDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly studentId: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string; // 邮箱没注册过就可以注册
}
