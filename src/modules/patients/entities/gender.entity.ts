import { Patient } from 'src/modules/patients/entities/patient.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity({ name: 'gender' })
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  description: string;

  @OneToOne(() => Patient, (patient) => patient.gender)
  patient: Patient;
}
