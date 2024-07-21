import { Injectable } from '@nestjs/common';

@Injectable()
export class Logger {
  async log(logEntry: any) {
    console.log(logEntry);
  }
}
