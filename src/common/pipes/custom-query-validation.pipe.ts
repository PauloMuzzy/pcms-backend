import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate, validateSync } from 'class-validator';
import { QueryBuilderDto } from 'src/common/dtos/query-builder.dto';
import { transformQueryBuilderParams } from 'src/common/functions/transform-query-builder-params';

@Injectable()
export class CustomQueryPipe<T extends object>
  implements PipeTransform<any, Promise<T>>
{
  constructor(private readonly dto?: new (...args: any[]) => T) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<T> {
    const dtoInstance = this.dto ? new this.dto() : {};

    const queryBuilderParamsTransformated = transformQueryBuilderParams(value);

    const dtoParams = Object.keys(value).reduce((acc, key) => {
      if (this.dto && key in dtoInstance) {
        acc[key] = value[key];
      }
      return acc;
    }, {});

    const validatedDto = plainToClass(this.dto || Object, dtoParams);
    const routeDtoErrors = await validate(validatedDto);

    const queryBuilderDtoInstance = plainToClass(
      QueryBuilderDto,
      queryBuilderParamsTransformated,
    );

    const queryBuilderErrors = validateSync(queryBuilderDtoInstance);

    let details = {};
    if (routeDtoErrors.length > 0 || queryBuilderErrors.length > 0) {
      const schemaErrors = this.formatSchemaErrors(routeDtoErrors);
      const queryBuilderErrorsFormatted =
        this.formatQueryBuilderErrors(queryBuilderErrors);

      details = {
        schemaErrors:
          schemaErrors && schemaErrors.length > 0 ? schemaErrors : [],
        queryBuilderErrors:
          queryBuilderErrorsFormatted && queryBuilderErrorsFormatted.length > 0
            ? queryBuilderErrorsFormatted
            : [],
      };
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Validation failed',
        details,
      });
    }

    return Object.assign(dtoInstance, value);
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

  private formatQueryBuilderErrors(
    errors: ValidationError[],
    parentProperty = '',
  ): any[] {
    return errors.flatMap((err) => {
      const propertyPath = parentProperty
        ? `${parentProperty}.${err.property}`
        : err.property;
      if (err.children && err.children.length > 0) {
        return this.formatQueryBuilderErrors(err.children, propertyPath);
      }
      return {
        field: propertyPath,
        message: Object.values(err.constraints || {}).join(', '),
      };
    });
  }
}
