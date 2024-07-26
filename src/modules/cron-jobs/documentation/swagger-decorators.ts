import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { FindCronJobsResponseDto } from 'src/modules/cron-jobs/dto/find-cron-jobs-response.dto';

export const FIND_CRON_JOBS_SWAGGER_DOC = [
  ApiOperation({ summary: 'Retrieve all cron jobs' }),
  ApiOkResponse({
    type: [FindCronJobsResponseDto],
    description: 'List of all cron jobs',
  }),
];

export const START_CRON_JOB_SWAGGER_DOC = [
  ApiOperation({ summary: 'Start a specific cron job' }),
  ApiParam({
    name: 'name',
    description: 'Name of the cron job to start',
  }),
  ApiOkResponse({ description: 'Cron job started successfully' }),
];

export const STOP_CRON_JOB_SWAGGER_DOC = [
  ApiOperation({ summary: 'Stop a specific cron job' }),
  ApiParam({
    name: 'name',
    description: 'Name of the cron job to stop',
  }),
  ApiOkResponse({ description: 'Cron job stopped successfully' }),
];

export const EXECUTE_CRON_JOB_SWAGGER_DOC = [
  ApiOperation({ summary: 'Execute a specific cron job' }),
  ApiParam({
    name: 'name',
    description: 'Name of the cron job to execute',
  }),
  ApiOkResponse({ description: 'Cron job executed successfully' }),
];
