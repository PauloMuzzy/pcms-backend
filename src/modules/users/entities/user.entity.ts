import {
  IsBoolean,
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @Column({ length: 100 })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @Column({ length: 100 })
  lastName: string;

  @IsNotEmpty()
  @IsISO8601()
  @Column({ type: 'date' })
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsEmail()
  @Column({ length: 500 })
  email: string;

  @IsNotEmpty()
  @Column({ length: 500 })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'user' })
  accessType: string;

  @IsBoolean()
  @Column({ default: 1 })
  active: number;
}
