import { ApiResponse } from '@nestjs/swagger';

export const getApiDefaultResponses = () => ({
  createSuccess: () =>
    ApiResponse({ status: 201, description: 'Registro bem-sucedido.' }),
  invalidRequest: () =>
    ApiResponse({ status: 400, description: 'Requisição inválida.' }),
  resourceNotFound: () =>
    ApiResponse({ status: 404, description: 'Recurso não encontrado.' }),
  unauthorized: () =>
    ApiResponse({ status: 401, description: 'Não autorizado.' }),
  internalServerError: () =>
    ApiResponse({ status: 500, description: 'Erro interno do servidor.' }),
});
