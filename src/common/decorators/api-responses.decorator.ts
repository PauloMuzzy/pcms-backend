import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiCommonResponses() {
  return applyDecorators(
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
    ApiResponse({ status: 404, description: 'Not Found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function ApiOkResponse<TModel extends Type<any>>(model?: TModel) {
  return ApiResponse({
    status: 200,
    description: 'Successful operation.',
    type: model,
  });
}

export function ApiCreatedResponse() {
  return ApiResponse({ status: 201, description: 'Created' });
}
