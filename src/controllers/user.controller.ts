import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegistryDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registry')
  @UsePipes(ValidationPipe)
  registry(@Body() registryDto: RegistryDto) {
    return this.userService.registry(registryDto);
  }
}
