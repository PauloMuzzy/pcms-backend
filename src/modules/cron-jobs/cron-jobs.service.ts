import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CronJobsNameRequestDto } from 'src/modules/cron-jobs/dto/cron-jobs-name-request.dto';
import { CleanupLogAppTableService } from 'src/modules/cron-jobs/services/cleanup-log-app-table.service';

export interface CronJobsInfo {
  name: string;
  frequency: string;
  lastExecution: Date | null;
  lastExecutionDuration: number | null;
  nextExecution: Date | null;
  running: boolean;
  active: boolean;
}

@Injectable()
export class CronJobsService {
  private readonly cronJobs: Record<string, CronJobsInfo> = {
    clearLogAppTable: {
      name: 'clearLogAppTable',
      frequency: CronExpression.EVERY_HOUR,
      lastExecution: null,
      lastExecutionDuration: null,
      nextExecution: null,
      running: false,
      active: true,
    },
  };

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly cleanupLogAppTableService: CleanupLogAppTableService,
  ) {
    this.registerCronJobs();
  }

  private registerCronJobs() {
    this.createCronJob(
      'clearLogAppTable',
      CronExpression.EVERY_HOUR,
      this.cleanupLogAppTableService.clearLogs.bind(
        this.cleanupLogAppTableService,
      ),
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
      this.updateCronJobExecutionDetails(name, startTime, endTime);
    });

    this.schedulerRegistry.addCronJob(name, job);
    this.updateNextExecution(name, job);
    job.start();
  }

  private updateCronJobExecutionDetails(
    name: string,
    startTime: number,
    endTime: number,
  ) {
    this.cronJobs[name].lastExecution = new Date();
    this.cronJobs[name].lastExecutionDuration = endTime - startTime;
    this.cronJobs[name].running = false;
  }

  private updateNextExecution(name: string, job: CronJob) {
    const nextExecution = job.nextDates(1)[0];
    this.cronJobs[name].nextExecution = nextExecution
      ? nextExecution.toJSDate()
      : null;
  }

  private createCronJobTasks(name: string): (() => Promise<void>) | null {
    switch (name) {
      case 'clearLogAppTable':
        return this.cleanupLogAppTableService.clearLogs.bind(
          this.cleanupLogAppTableService,
        );
      default:
        return null;
    }
  }

  find(): CronJobsNameRequestDto[] {
    Object.values(this.cronJobs).forEach((job) => {
      const cronJob = this.schedulerRegistry.getCronJob(job.name);
      if (cronJob) {
        this.updateNextExecution(job.name, cronJob);
        job.active = cronJob.running;
      }
    });
    return Object.values(this.cronJobs);
  }

  start(name: string): void {
    const job = this.schedulerRegistry.getCronJob(name);
    if (job && !job.running) {
      job.start();
      this.cronJobs[name].running = true;
      this.cronJobs[name].active = true;
    }
  }

  stop(name: string): void {
    const job = this.schedulerRegistry.getCronJob(name);
    if (job && job.running) {
      job.stop();
      this.cronJobs[name].running = false;
      this.cronJobs[name].active = false;
    }
  }

  async execute(name: string): Promise<void> {
    const cronJobInfo = this.cronJobs[name];
    if (!cronJobInfo) {
      throw new NotFoundException(`Cron job with name ${name} not found`);
    }

    const task = this.createCronJobTasks(name);
    if (task) {
      const startTime = Date.now();
      this.cronJobs[name].running = true;
      await task();
      const endTime = Date.now();
      this.updateCronJobExecutionDetails(name, startTime, endTime);
    } else {
      throw new InternalServerErrorException(
        `No task found for cron job with name ${name}`,
      );
    }
  }
}
