import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegistryDto } from '../dto/user.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ description: '成功注册' })
  @Post('registry')
  @UsePipes(ValidationPipe)
  registry(@Body() registryDto: RegistryDto) {
    return this.userService.registry(registryDto);
  }
}
