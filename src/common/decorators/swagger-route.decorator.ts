import { applyDecorators } from '@nestjs/common';

export function SwaggerRoute(decorators: any[]): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    applyDecorators(...decorators)(target, propertyKey, descriptor);
  };
}
