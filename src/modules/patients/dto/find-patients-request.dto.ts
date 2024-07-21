import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class FindPatientRequestDto {
  @ApiProperty({
    description: 'Unique identifier of the patient (UUID)',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 500)
  id?: string;

  @ApiProperty({
    description: 'Name of the patient',
    type: String,
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 500)
  name?: string;

  @ApiProperty({
    description: 'CPF of the patient (Brazilian identification number)',
    type: String,
    example: '12345678901',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  @Length(11, 11)
  cpf?: string;

  @ApiProperty({
    description: 'Email address of the patient',
    type: String,
    example: 'example@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  email?: string;

  @ApiProperty({
    description: 'Active status of the patient (1 for active, 0 for inactive)',
    type: String,
    enum: ['0', '1'],
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsIn(['0', '1'], { message: 'Active must be either 0 or 1' })
  @IsNumberString()
  active?: string;

  @ApiProperty({
    description: 'Field by which to sort the results',
    type: String,
    example: 'name',
    enum: ['name', 'dateOfBirth', 'createdAt'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['name', 'dateOfBirth', 'createdAt'], {
    message: 'Invalid sort field',
  })
  sortField?: string;

  @ApiProperty({
    description: 'Direction of sorting (ASC or DESC)',
    type: String,
    example: 'ASC',
    enum: ['ASC', 'DESC'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'], {
    message: 'Sort direction must be either ASC or DESC',
  })
  sortDirection?: string;

  @ApiProperty({
    description: 'Page number',
    type: String,
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({
    description: 'Number of items per page',
    type: String,
    enum: ['10', '20', '50'],
    example: '10',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  @IsIn(['10', '20', '50'], {
    message: 'Items per page must be either 10, 20 or 50',
  })
  itemsPerPage?: string;
}
