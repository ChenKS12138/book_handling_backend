import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { GetIp } from 'src/decorators/getIp.decorator';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Hello World' })
  getHello(@GetIp() ip: string): string {
    return this.appService.getHello(ip);
  }
}
