import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsBoolean()
  active: boolean = true;

  @IsNotEmpty()
  @IsString()
  accessProfile: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  accesses: string;
}
