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
import { CreatePatientRequestDto } from 'src/modules/patients/dto/create-patient-request.dto';
import { FindPatientsResponseDto } from 'src/modules/patients/dto/find-patients-response.dto';

export const CREATE_PATIENT_SWAGGER_DOC = [
  ApiOperation({ summary: 'Create a new patient record' }),
  ApiBody({
    type: CreatePatientRequestDto,
    description: 'Details of the patient to be created',
  }),
  ApiOkResponse({ description: 'Patient successfully created' }),
  ApiBadRequestResponse({ description: 'Invalid input provided' }),
  ApiUnauthorizedResponse({ description: 'Unauthorized request' }),
  ApiInternalServerErrorResponse({ description: 'Internal server error' }),
];

export const FIND_PATIENTS_SWAGGER_DOC = [
  ApiOperation({ summary: 'Find patients based on query parameters' }),
  ApiOkResponse({
    type: [FindPatientsResponseDto],
    description: 'List of patients matching the query',
  }),
  ApiBadRequestResponse({ description: 'Invalid query parameters' }),
  ApiUnauthorizedResponse({ description: 'Unauthorized request' }),
  ApiInternalServerErrorResponse({ description: 'Internal server error' }),
];

export const EDIT_PATIENT_SWAGGER_DOC = [
  ApiOperation({ summary: 'Update an existing patient record' }),
  ApiBody({
    type: CreatePatientRequestDto,
    description: 'Details of the patient to be updated',
  }),
  ApiOkResponse({ description: 'Patient successfully updated' }),
  ApiNotFoundResponse({ description: 'Patient not found' }),
  ApiBadRequestResponse({ description: 'Invalid input provided' }),
  ApiUnauthorizedResponse({ description: 'Unauthorized request' }),
  ApiInternalServerErrorResponse({ description: 'Internal server error' }),
];

export const REMOVE_PATIENT_SWAGGER_DOC = [
  ApiOperation({ summary: 'Delete a patient record' }),
  ApiParam({
    name: 'uuid',
    description: 'UUID of the patient to be deleted',
  }),
  ApiOkResponse({ description: 'Patient successfully deleted' }),
  ApiNotFoundResponse({ description: 'Patient not found' }),
  ApiBadRequestResponse({ description: 'Invalid UUID provided' }),
  ApiUnauthorizedResponse({ description: 'Unauthorized request' }),
  ApiInternalServerErrorResponse({ description: 'Internal server error' }),
];
