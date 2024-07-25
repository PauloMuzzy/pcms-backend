import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponses } from 'src/common/decorators/api-responses.decorator';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { CronJobNameRequestDto } from 'src/modules/cron-job/dto/cron-job-name-request.dto';
import { CronJobService } from './cron-job.service';

@ApiTags('CronJobs')
@ApiBearerAuth()
@Controller('cron-jobs')
export class CronJobController {
  constructor(private readonly cronJobService: CronJobService) {}

  @ApiCommonResponses()
  @ApiOkResponse()
  @Get('find')
  find(): CronJobNameRequestDto[] {
    return this.cronJobService.find();
  }

  @UsePipes(new CustomRequestValidatorPipe(CronJobNameRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse()
  @Post('start')
  start(@Body() body: CronJobNameRequestDto): void {
    this.cronJobService.start(body.name);
  }

  @Post('stop')
  @UsePipes(new CustomRequestValidatorPipe(CronJobNameRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse()
  stop(@Body() body: CronJobNameRequestDto): void {
    this.cronJobService.stop(body.name);
  }

  @Post('execute')
  @UsePipes(new CustomRequestValidatorPipe(CronJobNameRequestDto))
  @ApiCommonResponses()
  @ApiOkResponse()
  execute(@Body() body: CronJobNameRequestDto): void {
    this.cronJobService.execute(body.name);
  }
}
