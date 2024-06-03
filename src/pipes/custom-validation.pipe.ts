import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe
  extends ValidationPipe
  implements PipeTransform
{
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Alguns parâmetros não foram passados ou estão incorretos',
        error: 'Bad Request',
        statusCode: 400,
        schemaError: errors.map((error) => ({
          field: error.property,
          error: Object.values(error.constraints),
        })),
      });
    }
    return value;
  }
}
