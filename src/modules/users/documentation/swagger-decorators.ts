import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { FindUsersResponseDto } from 'src/modules/users/dto/find-users-response.dto';

export const CREATE_USER_SWAGGER_DOC = [
  ApiOperation({ summary: 'Create a new user' }),
  ApiCreatedResponse({ description: 'User successfully created' }),
];

export const FIND_USERS_SWAGGER_DOC = [
  ApiOperation({ summary: 'Find users based on query parameters' }),
  ApiOkResponse({
    type: [FindUsersResponseDto],
    description: 'List of users matching the query',
  }),
];

export const EDIT_USER_SWAGGER_DOC = [
  ApiOperation({ summary: 'Update an existing user record' }),
  ApiOkResponse({ description: 'User successfully updated' }),
];

export const REMOVE_USER_SWAGGER_DOC = [
  ApiOperation({ summary: 'Delete a user record' }),
  ApiParam({
    name: 'uuid',
    description: 'UUID of the user to be deleted',
  }),
  ApiOkResponse({ description: 'User successfully deleted' }),
];
