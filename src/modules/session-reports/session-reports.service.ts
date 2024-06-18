import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionReportsService {
  async find(patientId: any): Promise<any> {
    return 'This action returns all reports';
  }
}
