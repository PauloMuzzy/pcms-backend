import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CronJobsService } from 'src/modules/cron-jobs/cron-jobs.service';
import { CronJobsNameRequestDto } from 'src/modules/cron-jobs/dto/cron-jobs-name-request.dto';

@ApiTags('CronJobs')
@Controller('cron-jobs')
export class CronJobsController {
  constructor(private readonly cronJobsService: CronJobsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  find(): CronJobsNameRequestDto[] {
    return this.cronJobsService.find();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(CronJobsNameRequestDto))
  @Post('start/:name')
  start(@Param('name') param: CronJobsNameRequestDto): void {
    this.cronJobsService.start(param.name);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(CronJobsNameRequestDto))
  @Post('stop/:name')
  stop(@Param('name') param: CronJobsNameRequestDto): void {
    this.cronJobsService.stop(param.name);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(CronJobsNameRequestDto))
  @Post('execute/:name')
  execute(@Param('name') param: CronJobsNameRequestDto): void {
    this.cronJobsService.execute(param.name);
  }
}
