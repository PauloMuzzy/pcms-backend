import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UuidService {
  async generate(): Promise<string> {
    return uuidv4();
  }
}
