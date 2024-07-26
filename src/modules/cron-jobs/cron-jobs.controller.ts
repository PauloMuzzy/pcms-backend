import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRoute } from 'src/common/decorators/swagger-route.decorator';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CronJobsService } from 'src/modules/cron-jobs/cron-jobs.service';
import {
  EXECUTE_CRON_JOB_SWAGGER_DOC,
  FIND_CRON_JOBS_SWAGGER_DOC,
  START_CRON_JOB_SWAGGER_DOC,
  STOP_CRON_JOB_SWAGGER_DOC,
} from 'src/modules/cron-jobs/documentation/swagger-decorators';
import { CronJobsNameRequestDto } from 'src/modules/cron-jobs/dto/cron-jobs-name-request.dto';

@ApiTags('CronJobs')
@Controller('cron-jobs')
export class CronJobsController {
  constructor(private readonly cronJobsService: CronJobsService) {}

  @UseGuards(JwtAuthGuard)
  @SwaggerRoute(FIND_CRON_JOBS_SWAGGER_DOC)
  @Get()
  find(): CronJobsNameRequestDto[] {
    return this.cronJobsService.find();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(CronJobsNameRequestDto))
  @SwaggerRoute(START_CRON_JOB_SWAGGER_DOC)
  @Post('start/:name')
  start(@Param('name') param: CronJobsNameRequestDto): void {
    this.cronJobsService.start(param.name);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(CronJobsNameRequestDto))
  @SwaggerRoute(STOP_CRON_JOB_SWAGGER_DOC)
  @Post('stop/:name')
  stop(@Param('name') param: CronJobsNameRequestDto): void {
    this.cronJobsService.stop(param.name);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(CronJobsNameRequestDto))
  @SwaggerRoute(EXECUTE_CRON_JOB_SWAGGER_DOC)
  @Post('execute/:name')
  execute(@Param('name') param: CronJobsNameRequestDto): void {
    this.cronJobsService.execute(param.name);
  }
}
