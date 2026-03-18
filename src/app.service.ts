import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: 'PCMS Backend API',
      version: '1.0.0',
      description: 'Sistema de Gerenciamento de Atendimentos Psicológicos',
      environment: process.env.NODE_ENV || 'development',
      docs: '/api/docs',
      health: '/api/v1/health',
    };
  }
}
