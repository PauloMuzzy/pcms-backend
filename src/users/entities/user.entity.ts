import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
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
  @IsEmail()
  @Column({ length: 500 })
  email: string;

  @IsNotEmpty()
  @Column({ length: 500 })
  password: string;

  @IsBoolean()
  @Column({ default: true })
  active: boolean;

  @IsNotEmpty()
  @IsString()
  @Column({ default: 'user' })
  accessProfile: string;

  @IsNotEmpty()
  @IsString()
  @Column({ length: 100 })
  accesses: string;
}
