import { Gender } from 'src/modules/patients/entities/gender.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 11, nullable: true })
  cpf?: string;

  @Column({ length: 100 })
  email: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ length: 50 })
  profession: string;

  @Column({ length: 25 })
  phone: string;

  @Column({ length: 100 })
  emergencyContactName: string;

  @Column({ length: 25 })
  emergencyContactPhone: string;

  @Column({ length: 50 })
  emergencyContactRelationship: string;

  @Column({ default: 1 })
  active: number;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => Gender, (gender) => gender.patients)
  gender: number;
}
