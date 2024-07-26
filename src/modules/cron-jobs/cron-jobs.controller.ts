import { Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponses } from 'src/common/decorators/api-responses.decorator';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { CronJobsService } from 'src/modules/cron-jobs/cron-jobs.service';
import { CronJobsNameRequestDto } from 'src/modules/cron-jobs/dto/cron-jobs-name-request.dto';

@ApiTags('CronJobs')
@ApiBearerAuth()
@Controller('cron-jobs')
export class CronJobsController {
  constructor(private readonly cronJobsService: CronJobsService) {}

  @ApiCommonResponses()
  @ApiOkResponse()
  @Get()
  find(): CronJobsNameRequestDto[] {
    return this.cronJobsService.find();
  }

  @UsePipes(new CustomRequestValidatorPipe(CronJobsNameRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse()
  @Post('start/:name')
  start(@Param('name') param: CronJobsNameRequestDto): void {
    this.cronJobsService.start(param.name);
  }

  @UsePipes(new CustomRequestValidatorPipe(CronJobsNameRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse()
  @Post('stop/:name')
  stop(@Param('name') param: CronJobsNameRequestDto): void {
    this.cronJobsService.stop(param.name);
  }

  @UsePipes(new CustomRequestValidatorPipe(CronJobsNameRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse()
  @Post('execute/:name')
  execute(@Param('name') param: CronJobsNameRequestDto): void {
    this.cronJobsService.execute(param.name);
  }
}
