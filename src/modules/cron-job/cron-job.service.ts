import { Injectable, Logger } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { DatabaseService } from 'src/database/database.service';
import { CronJobNameRequestDto } from 'src/modules/cron-job/dto/cron-job-name-request.dto';

export interface CronJobInfo {
  name: string;
  frequency: string;
  lastExecution: Date | null;
  lastExecutionDuration: number | null;
  nextExecution: Date | null;
  running: boolean;
}

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);
  private readonly cronJobs: Record<string, CronJobInfo> = {
    clearLogAppTable: {
      name: 'clearLogAppTable',
      frequency: CronExpression.EVERY_MINUTE,
      lastExecution: null,
      lastExecutionDuration: null,
      nextExecution: null,
      running: false,
    },
    addLogAppTable: {
      name: 'addLogAppTable',
      frequency: CronExpression.EVERY_30_SECONDS,
      lastExecution: null,
      lastExecutionDuration: null,
      nextExecution: null,
      running: false,
    },
  };

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.registerCronJobs();
  }

  private registerCronJobs() {
    this.createCronJob(
      'clearLogAppTable',
      CronExpression.EVERY_MINUTE,
      this.clearLogAppTable.bind(this),
    );
    this.createCronJob(
      'addLogAppTable',
      CronExpression.EVERY_30_SECONDS,
      this.addLogAppTable.bind(this),
    );
  }

  private createCronJob(
    name: string,
    frequency: string,
    task: () => Promise<void>,
  ) {
    const job = new CronJob(frequency, async () => {
      const startTime = Date.now();
      this.cronJobs[name].running = true;
      await task();
      const endTime = Date.now();
      this.cronJobs[name].lastExecution = new Date();
      this.cronJobs[name].lastExecutionDuration = endTime - startTime;
      this.cronJobs[name].running = false;
    });

    this.schedulerRegistry.addCronJob(name, job);
    const nextExecution = job.nextDates(1)[0];
    this.cronJobs[name].nextExecution = nextExecution
      ? nextExecution.toJSDate()
      : null;
    job.start();
    this.logger.log(`Cron job "${name}" scheduled: ${frequency}`);
  }

  async clearLogAppTable() {
    const sql = 'DELETE FROM log_app';
    try {
      await this.databaseService.query(sql);
    } catch (error) {}
  }

  async addLogAppTable() {
    const sql = `
      INSERT INTO log_app (
        status_code,
        createdAt,
        path,
        ip,
        user_agent,
        error_message,
        stack,
        file,
        line
      ) VALUES 
       (? , ? , ? , ? , ? , ? , ? , ? , ?)
    `;

    try {
      await this.databaseService.query(sql, [
        '500',
        '2024-07-23 15:45:00',
        '/api/v1/resource',
        '192.168.1.1',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Internal server error occurred.',
        'Error: ...\n at ...',
        'app.service.js',
        '42',
      ]);
    } catch (error) {}
  }

  find(): CronJobNameRequestDto[] {
    Object.values(this.cronJobs).forEach((job) => {
      const cronJob = this.schedulerRegistry.getCronJob(job.name);
      if (cronJob) {
        const nextExecution = cronJob.nextDates(1)[0];
        job.nextExecution = nextExecution ? nextExecution.toJSDate() : null;
      }
    });
    return Object.values(this.cronJobs);
  }

  start(name: string): void {
    const job = this.schedulerRegistry.getCronJob(name);
    if (job && !job.running) {
      job.start();
      this.cronJobs[name].running = true;
    }
  }

  stop(name: string): void {
    const job = this.schedulerRegistry.getCronJob(name);
    if (job && job.running) {
      job.stop();
      this.cronJobs[name].running = false;
    }
  }
}
