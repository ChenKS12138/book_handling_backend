import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(ip: string): string {
    return [
      'Hello World! ',
      'Book Handling ',
      `Receive Request From ${ip}`,
    ].join('\n');
  }
}
