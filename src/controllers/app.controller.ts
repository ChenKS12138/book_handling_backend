import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { GetIp } from 'src/decorators/getIp.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@GetIp() ip: string): string {
    return this.appService.getHello(ip);
  }
}
