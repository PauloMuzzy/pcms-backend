import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

@Entity('additional_informations')
export class AdditionalInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Column()
  patientId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  @Column()
  diagnosis: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 500)
  @Column({ nullable: true })
  medications: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
