import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { FindPsychologistsResponseDto } from 'src/modules/psychologists/dto/find-psychologists-response.dto';

export const CREATE_PSYCHOLOGIST_SWAGGER_DOC = [
  ApiOperation({ summary: 'Create a new psychologist' }),
  ApiCreatedResponse({ description: 'Psychologist successfully created' }),
];

export const FIND_PSYCHOLOGISTS_SWAGGER_DOC = [
  ApiOperation({ summary: 'Find psychologists based on query parameters' }),
  ApiOkResponse({
    type: [FindPsychologistsResponseDto],
    description: 'List of psychologists matching the query',
  }),
];

export const EDIT_PSYCHOLOGIST_SWAGGER_DOC = [
  ApiOperation({ summary: 'Update an existing psychologist record' }),
  ApiOkResponse({ description: 'Psychologist successfully updated' }),
];

export const REMOVE_PSYCHOLOGIST_SWAGGER_DOC = [
  ApiOperation({ summary: 'Delete a psychologist record' }),
  ApiParam({
    name: 'uuid',
    description: 'UUID of the psychologist to be deleted',
  }),
  ApiOkResponse({ description: 'Psychologist successfully deleted' }),
];
