import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateDemandRequestDto } from 'src/modules/demands/dto/create-demand-request.dto';
import { EditDemandRequestDto } from 'src/modules/demands/dto/edit-demand-request.dto';
import { FindDemandResponseDto } from 'src/modules/demands/dto/find-demand-response.dto';

export const CREATE_DEMAND_SWAGGER_DOC = [
  ApiOperation({ summary: 'Create a new demand record' }),
  ApiBody({
    type: CreateDemandRequestDto,
    description: 'Details of the demand to be created',
  }),
  ApiOkResponse({ description: 'Demand successfully created' }),
  ApiBadRequestResponse({ description: 'Invalid input provided' }),
  ApiUnauthorizedResponse({ description: 'Unauthorized request' }),
  ApiInternalServerErrorResponse({ description: 'Internal server error' }),
];

export const FIND_DEMANDS_SWAGGER_DOC = [
  ApiOperation({ summary: 'Find demands based on query parameters' }),
  ApiOkResponse({
    type: [FindDemandResponseDto],
    description: 'List of demands matching the query',
  }),
  ApiBadRequestResponse({ description: 'Invalid query parameters' }),
  ApiUnauthorizedResponse({ description: 'Unauthorized request' }),
  ApiInternalServerErrorResponse({ description: 'Internal server error' }),
];

export const EDIT_DEMAND_SWAGGER_DOC = [
  ApiOperation({ summary: 'Update an existing demand record' }),
  ApiBody({
    type: EditDemandRequestDto,
    description: 'Details of the demand to be updated',
  }),
  ApiOkResponse({ description: 'Demand successfully updated' }),
  ApiNotFoundResponse({ description: 'Demand not found' }),
  ApiBadRequestResponse({ description: 'Invalid input provided' }),
  ApiUnauthorizedResponse({ description: 'Unauthorized request' }),
  ApiInternalServerErrorResponse({ description: 'Internal server error' }),
];

export const REMOVE_DEMAND_SWAGGER_DOC = [
  ApiOperation({ summary: 'Delete a demand record' }),
  ApiParam({
    name: 'uuid',
    description: 'UUID of the demand to be deleted',
  }),
  ApiOkResponse({ description: 'Demand successfully deleted' }),
  ApiNotFoundResponse({ description: 'Demand not found' }),
  ApiBadRequestResponse({ description: 'Invalid UUID provided' }),
  ApiUnauthorizedResponse({ description: 'Unauthorized request' }),
  ApiInternalServerErrorResponse({ description: 'Internal server error' }),
];
