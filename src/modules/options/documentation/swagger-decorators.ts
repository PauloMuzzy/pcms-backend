import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { FindOptionsListResponseDto } from 'src/modules/options/dto/find-options-list-response.dto';

export const FIND_OPTIONS_LIST_SWAGGER_DOC = [
  ApiOperation({ summary: 'Find options list by name' }),
  ApiParam({
    name: 'name',
    description: 'Name of the options list to retrieve',
  }),
  ApiOkResponse({
    type: [FindOptionsListResponseDto],
    description: 'List of options for the specified name',
  }),
];
