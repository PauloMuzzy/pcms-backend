import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class CustomRequestValidatorPipe<T extends object>
  implements PipeTransform<any, Promise<T | any>>
{
  constructor(private readonly dto: new (...args: any[]) => T) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<T | any> {
    if (metadata.type === 'body' || metadata.type === 'query') {
      // Handle 'body' and 'query'
      const dtoInstance = plainToClass(this.dto, value);
      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        const schemaErrors = this.formatSchemaErrors(errors);
        throw new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          details: { schemaErrors },
        });
      }
      return dtoInstance;
    }

    if (metadata.type === 'param') {
      // Handle 'param'
      const dtoInstance = plainToClass(this.dto, { [metadata.data]: value });
      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        const schemaErrors = this.formatSchemaErrors(errors, 'param');
        throw new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          details: { schemaErrors },
        });
      }
      return dtoInstance;
    }

    return value;
  }

  private formatSchemaErrors(
    errors: ValidationError[],
    type?: 'param' | 'body' | 'query',
  ) {
    return errors.flatMap((err) => {
      if (err.children && err.children.length > 0) {
        return this.formatSchemaErrors(err.children, type);
      }

      const errorMessage = Object.values(err.constraints || {}).join(', ');

      if (type === 'param') {
        return {
          param: err.property,
          message: errorMessage,
        };
      }

      return {
        field: err.property,
        message: errorMessage,
      };
    });
  }
}

//CustomRequestValidatorPipe;
