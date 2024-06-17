import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  async find(patientId: any): Promise<any> {
    return 'This action returns all reports';
  }
}
