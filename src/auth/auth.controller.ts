import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { LoginDto } from '../dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ description: '用户成功登陆' })
  @ApiOkResponse({ description: '用户名或密码错误' })
  userLogin(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto);
  }

  @Post('admin')
  @ApiOkResponse({ description: '管理员成功登陆' })
  @ApiOkResponse({ description: '用户名或密码错误' })
  @UsePipes(ValidationPipe)
  adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.adminLogin(loginDto);
  }
}
