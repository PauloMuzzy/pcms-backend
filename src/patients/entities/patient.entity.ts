import {
  IsBoolean,
  IsEmail,
  IsISO8601,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'patients' })
export class Patient {
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

  @IsString()
  @Length(11, 11)
  @Column({ length: 11, nullable: true })
  cpf?: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({ length: 100 })
  email: string;

  @IsNotEmpty()
  @IsISO8601()
  @Column({ type: 'date' })
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['M', 'F'])
  @Column({ type: 'char', length: 1 })
  gender: string;

  @IsNotEmpty()
  @IsString()
  @Column({ length: 50 })
  profession: string;

  @IsNotEmpty()
  @IsString()
  @Column({ length: 25 })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Column({ length: 100 })
  emergencyContactName: string;

  @IsNotEmpty()
  @IsString()
  @Column({ length: 25 })
  emergencyContactPhone: string;

  @IsNotEmpty()
  @IsString()
  @Column({ length: 50 })
  emergencyContactRelationship: string;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ default: 1 })
  active: number;

  @IsNotEmpty()
  @IsISO8601()
  @Column({ type: 'datetime' })
  createdAt: Date;

  @IsNotEmpty()
  @IsISO8601()
  @Column({ type: 'datetime' })
  updatedAt: Date;
}
