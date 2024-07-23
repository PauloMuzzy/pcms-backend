import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate, validateSync } from 'class-validator';

@Injectable()
export class CustomRequestValidatorPipe<T extends object>
  implements PipeTransform<any, Promise<T>>
{
  constructor(private readonly dto: new (...args: any[]) => T) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<T> {
    if (!this.dto) {
      throw new Error('DTO is required');
    }

    const dtoInstance = await plainToClass(this.dto, value);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const schemaErrors = this.formatSchemaErrors(errors);
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        details: {
          schemaErrors,
        },
      });
    }

    return dtoInstance;
  }

  private formatSchemaErrors(errors: ValidationError[]) {
    return errors.flatMap((err) => {
      if (err.children && err.children.length > 0) {
        return this.formatSchemaErrors(err.children);
      }
      return {
        field: err.property,
        message: Object.values(err.constraints || {}).join(', '),
      };
    });
  }
}
